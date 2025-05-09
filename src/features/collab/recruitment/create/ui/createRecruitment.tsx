'use client'

import * as styles from "./createRecruitment.css"
import InputCalendar from "@/shared/ui/molecules/input-calendar/InputCalendar"
import Checkbox from "@/shared/ui/atoms/checkbox/Checkbox"
import BorderButton from "@/shared/ui/atoms/button/BorderButton"
import Button from "@/shared/ui/atoms/button/Button"
import InputForm from "@/shared/ui/molecules/input-form/InputForm"
import ComboInput from "@/features/collab/recruitment/create/ui/comboInput"
import TextArea from "@/shared/ui/molecules/input-textarea/TextArea"
import {
  genreOptions,
  recruitedInstrumentOptions,
  requiredGenderOptions,
  requiredGenerationOptions,
  requiredNumberOfInstrumentOptions,
} from "@/features/collab/recruitment/model/options"
import {useCreateRecruitmentForm} from "@/features/collab/recruitment/create/model/useCreateRecruitment"
import React from "react"
import useModal from "@/shared/hooks/useModal"
import Modal from "@/shared/ui/organisms/modal/Modal"
import {RecruitmentSchema} from "@/entities/collab/recruitment/recruitment.model"
import {useRecruitment} from "@/features/collab/recruitment/create/model/recruitment.state"
import CreateRecruitmentConfirmModal from "@/features/collab/recruitment/create/ui/createRecruitmentConfirmModal"

type Props = {
  readonly onPress?: () => void
  readonly isDisabled: boolean
  readonly confirmedRecruitment?: RecruitmentSchema
}

// after post recruitment, close modal and clear input
const initialRecruitment: RecruitmentSchema = {
  owner: "",
  ownerInstruments: [],
  songTitle: "",
  artist: "",
  name: "",
  genres: [],
  deadline: "",
  requiredGenerations: [],
  requiredGenders: [],
  recruitedInstruments: new Map(),
  memo: "",
};

const CreateRecruitmentForm = (props: Props) => {
  const {updatedRecruitment} = useRecruitment()
  const {isOpen, modalOptions, openModal, closeModal} = useModal()
  const {
    ownerInstruments,
    setOwnerInstruments,
    setSongTitle,
    setArtist,
    setName,
    genres,
    setGenres,
    setDeadline,
    requiredGenerations,
    setRequiredGenerations,
    requiredGenders,
    setRequiredGenders,
    requiredInstrumentInputs,
    setMemo,
    handleAddInput,
    handleComboInputChange,
    submitting,
  } = useCreateRecruitmentForm()
  
  return (
    <div className={styles.itemsSetVertical}>
      <div className={styles.itemsSetHorizontal}>
        <Checkbox
          props={{defaultSelected: false}}
          options={recruitedInstrumentOptions}
          selectedValues={ownerInstruments}
          onChange={setOwnerInstruments}
        />
      </div>
      <div className={styles.itemsSetHorizontal}>
        <InputForm
          label="曲名"
          displayedRequired={false}
          textBoxProps={{
            isDisabled: false,
            onChange: setSongTitle,
          }}
        />
        <InputForm
          label="アーティスト名"
          displayedRequired={false}
          textBoxProps={{
            isDisabled: false,
            onChange: setArtist,
          }}
        />
      </div>
      <div className={styles.itemsSetVertical}>
        {/*選択解除後も文字を白で表示したい*/}
        {/*ドロップダウンリストの下矢印を白で表示したい*/}
        <div className={styles.itemsSetHorizontal}>
          {/* ジャンルは一旦チェックボックスで作る */}
          <Checkbox
            props={{
              defaultSelected: false,
            }}
            options={genreOptions}
            selectedValues={genres}
            onChange={setGenres}
          />
          <InputForm
            label="コラボ名"
            displayedRequired={false}
            textBoxProps={
              {
                isDisabled: false,
                onChange: setName
              }
            }
          />
        </div>
        <div className={styles.itemsSetHorizontal}>
          <InputCalendar
            title={"募集締切日"}
            displayedRequired={true}
            datePickerProps={
              {
                isDisabled: false,
                onChange: setDeadline,
              }
            }
          />
        </div>
        <p className={styles.headline2}>応募するメンバー</p>
        <div className={styles.itemsSetHorizontal}>
          <Checkbox
            props={{
              defaultSelected: false,
            }}
            options={requiredGenerationOptions}
            selectedValues={requiredGenerations}
            onChange={setRequiredGenerations}
          />
        </div>
        <div className={styles.itemsSetHorizontal}>
          <Checkbox
            props={{
              defaultSelected: false,
            }}
            options={requiredGenderOptions}
            selectedValues={requiredGenders}
            onChange={setRequiredGenders}
          />
        </div>
        <div className={styles.itemsSetHorizontal}>
          {requiredInstrumentInputs.map((input) => (
            <ComboInput
              key={input.id}
              title={"楽器"}
              defaultStringOption={''}
              stringOptions={recruitedInstrumentOptions}
              numberOptions={requiredNumberOfInstrumentOptions}
              onChange={(stringValue, numberValue) =>
                handleComboInputChange(input.id, stringValue, numberValue)
              }
              selectedString={input.selectedString}
              selectedNumber={input.selectedNumber}
            />
          ))}
          <button onClick={handleAddInput}>
            ＋
          </button>
        </div>
        <TextArea
          label={"メモ"}
          type={"text"}
          valueType={"string"}
          placeholder={"メモを入力してください"}
          isDisabled={false}
          onChange={setMemo}
        />
        <div className={styles.itemsSetHorizontal}>
          <BorderButton
            appearance="primary"
            type="button"
            onPress={() => {
            }}
          >
            下書きに保存する
          </BorderButton>
          <Button
            appearance="primary"
            type="button"
            isDisabled={submitting || props.isDisabled}
            onPress={() => {
              openModal({
                children: "モーダルの内容",
                dialogAriaLabel: "内容を確認する",
              })
            }}
          >
            内容を確認する→
          </Button>
          <br/>
        </div>
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onOpenChange={closeModal}
          isDismissable={true}
          dialogAriaLabel={modalOptions.dialogAriaLabel}
        >
          {/*TODO resetRecruitment*/}
          <CreateRecruitmentConfirmModal
            onClose={closeModal}
            updatedRecruitment={updatedRecruitment}
            resetRecruitment={() => {}}
          />
        </Modal>
      )}
    </div>
  )
}

export default CreateRecruitmentForm

