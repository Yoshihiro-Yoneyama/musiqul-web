'use client'

import * as styles from "./createRecruitment.css";
import InputSelector from "@/shared/ui/molecules/input-selector/InputSelector";
import InputCalendar from "@/shared/ui/molecules/input-calendar/InputCalendar";
import Checkbox from "@/shared/ui/atoms/checkbox/Checkbox";
import ComboInput from "@/shared/ui/molecules/combo-input/ComboInput";
import BorderButton from "@/shared/ui/atoms/button/BorderButton";
import Button from "@/shared/ui/atoms/button/Button";
import React, {ChangeEvent, FC, useCallback, useState} from "react";
import {TextField} from "@mui/material";
import {useRecruitment} from "@/entities/collab/recruitment/recruitment.state";
import {createRecruitment} from "@/features/collab/recruitment/model/createRecruitment";
import InputForm from "@/shared/ui/molecules/input-form/InputForm";
import {
  CheckboxOption,
  recruitedInstruments,
  requiredGenders,
  requiredGenerationOptions, requiredNumberOfInstruments
} from "@/features/collab/recruitment/model/options";

type Props = {
  onPress?: () => void
  isDisabled: boolean
}

const CreateRecruitmentForm = (props: Props) => {
  const [songTitle, setSongTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [name, setName] = useState('')
  const [genre, setGenre] = useState<string[]>([])
  const [deadline, setDeadline] = useState('')
  const [requiredGenerations, setRequiredGenerations] = useState<CheckboxOption[]>([])
  const [requiredGender, setRequiredGender] = useState('')
  
  const {recruitment, updateRecruitment} = useRecruitment()
  
  const handleSongTitleChange = (value: string) => {
    setSongTitle(value)
    updateRecruitment({
      ...recruitment,
      songTitle: value
    })
  }
  const handleArtistChange = (value: string) => {
    setArtist(value)
    updateRecruitment({
      ...recruitment,
      artist: value
    })
  }
  // const handleNameChange = (value: string) => {
  //   setName(value)
  //   updateRecruitment({name: value})
  // }
  // const handleGenre = (values: string[]) => {
  //   setGenre(values)
  //   updateRecruitment({genre: values})
  // }
  // const handleDeadline = (value: string) => {
  //   setDeadline(value)
  //   updateRecruitment({deadline: value})
  // }
  // const handleRequiredGenerations = (values: CheckboxOption[]) => {
  //   setRequiredGenerations(values)
  //   updateRecruitment({requiredGenerations: values})
  // }
  const handleRequiredGender = (value: string) => {
    setRequiredGender(value);
    updateRecruitment({
      ...recruitment, // 現在の状態を展開
      requiredGender: value || '', // 必要なプロパティを上書き
    });
  };
  

  const [submitting, setSubmitting] = useState(false)
  
  /**
   * handler of confirm
   */
  const handleSubmit = useCallback(async () => {
    // Defence duplicate submission
    if (submitting) return
    setSubmitting(true)
    if (props.onPress) {
      props.onPress()
    }
    
    // RecruitmentSchema形式にデータを整形
    const initRecruitment = {
      owner: 'UUID',
      songTitle: songTitle,
      artist: artist,
      name: name,
      genre: genre,
      deadline: deadline,
      requiredGenerations: requiredGenerations,
      requiredGender: requiredGender,
    }
    
    // Update the recruitment state
    updateRecruitment(initRecruitment)
    
    try {
      // TODO Document the error handling
      const processedRecruitment = await createRecruitment(initRecruitment); // APIリクエスト
      console.log('Recruitment created:', processedRecruitment);
      
      setSongTitle('')
      setArtist('')
      setName('')
      setGenre([])
      setDeadline('')
      setRequiredGenerations([])
      setRequiredGender('')
    } catch (error) {
      console.error('Error creating recruitment:', error);
    } finally {
      setSubmitting(false)
    }
  }, [
    songTitle,
    artist,
    name,
    genre,
    deadline,
    requiredGenerations,
    requiredGender,
  ])
  
  return (
    <>
      <div className={styles.itemsSetVertical}>
        <div className={styles.itemsSetHorizontal}>
          <InputForm
            title="曲名"
            displayedRequired={false}
            textBoxProps={
              {
                name: "songTitle",
                isDisabled: false,
                onChange: (e: ChangeEvent<HTMLInputElement>) => handleSongTitleChange(e.target.value),
              }
            }
          />
          <InputForm
            title="アーティスト名"
            displayedRequired={false}
            textBoxProps={
              {
                name: "artist",
                isDisabled: false,
                onChange: (e: ChangeEvent<HTMLInputElement>) => handleArtistChange(e.target.value),
              }
            }
          />
        </div>
        {/*選択解除後も文字を白で表示したい*/}
        {/*ドロップダウンリストの下矢印を白で表示したい*/}
        <div className={styles.itemsSetHorizontal}>
          {/* ジャンルは一旦チェックボックスで作る */}
          {/*<InputSelector*/}
          {/*  title={"ジャンル"}*/}
          {/*  displayedRequired={true}*/}
          {/*  selectorProps={*/}
          {/*    {*/}
          {/*      selectedValue: recruitment.genre.,*/}
          {/*      options: genres,*/}
          {/*      isDisabled: false,*/}
          {/*    }*/}
          {/*  }*/}
          {/*/>*/}
          <TextField
            label="コラボ名"
            name="name"
            value={name}
            onChange={(e => setName(e.target.value))}
          />
        </div>
        <div className={styles.itemsSetHorizontal}>
          <InputCalendar id={"deadline"} title={"募集締切日"} name={"deadline"} disabled={false}
                         displayedRequired={true}/>
        </div>
        <p className={styles.headline2}>応募するメンバー</p>
        <div className={styles.itemsSetHorizontal}>
          <Checkbox
            id={'requiredGenerations'}
            title={'年齢'}
            name={'requiredGenerations'}
            options={requiredGenerationOptions}
          />
        </div>
        <div className={styles.itemsSetHorizontal}>
          {/*<Checkbox*/}
          {/*  id={'requiredGenders'}*/}
          {/*  title={'性別'}*/}
          {/*  name={'requiredGenders'}*/}
          {/*  options={requiredGenders}*/}
          {/*/>*/}
          <InputSelector
            title={"性別"}
            displayedRequired={true}
            selectorProps={
              {
                selectedValue: recruitment.requiredGender,
                options: requiredGenders,
                defaultOptionLabel: '選択してください。',
                isDisabled: false,
                onChange: handleRequiredGender,
              }
            }
          />
        </div>
        <div className={styles.itemsSetHorizontal}>
          {/*選択項目が消える*/}
          {/*<InputSelector*/}
          {/*  title={"楽器"}*/}
          {/*  name={"recruitedInstruments"}*/}
          {/*  options={recruitedInstruments.map(value => value)}*/}
          {/*  onChange={handleGenreChange}*/}
          {/*  selectedValue={genre}*/}
          {/*  disabled={false}*/}
          {/*  displayedRequired={true}*/}
          {/*/>*/}
          {/*<Selector*/}
          {/*  name={"numberOfPeople"}*/}
          {/*  options={[*/}
          {/*    {value: '0', label: '0'},*/}
          {/*    {value: '1', label: '1'},*/}
          {/*  ]}*/}
          {/*  onChange={handleGenreChange}*/}
          {/*  selectedValue={genre}*/}
          {/*/>*/}
        </div>
        <div className={styles.itemsSetHorizontal}>
          <ComboInput
            id={"recruitedInstruments"}
            name={"recruitedInstruments"}
            options1={recruitedInstruments.map(value => value)}
            options2={requiredNumberOfInstruments.map(value => value)}
            disabled={false}
          />
        </div>
        <div className={styles.itemsSetHorizontal}>
          <BorderButton variant={"default"} onClick={() => {
          }}>
            下書きに保存する
          </BorderButton>
          <Button
            appearance="primary"
            type="button"
            onPress={handleSubmit}
            isDisabled={submitting || props.isDisabled}
          >
            内容を確認する→
          </Button>
          <br/>
        </div>
      </div>
    </>
  )
}

export default CreateRecruitmentForm;