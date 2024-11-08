"use client"

import React, {useState} from "react";
import {createRecruitment, CreateRecruitmentRequest} from "@/app/collab/recruitment/CreateRecruitment";
import Button from "@/components/atoms/button/Button";
import BorderButton from "@/components/atoms/button/BorderButton";
import InputForm from "@/components/molecules/input-form/InputForm";
import * as styles from "./collab.css"
import InputSelector from "@/components/molecules/input-selector/InputSelector";
import InputCalendar from "@/components/molecules/input-calendar/InputCalendar";
import Checkbox from "@/components/atoms/checkbox/Checkbox";
import Selector from "@/components/atoms/selector/Selector";
import ComboInput from "@/components/molecules/combo-input/ComboInput";

type SelectorOption = {
  value: string;
  label: string;
}

const genres: SelectorOption[] = [
  {value: '', label: ''},
  {value: 'ROCK', label: 'ロック'},
  {value: 'JAZZ', label: 'ジャズ'},
  {value: 'POP', label: 'ポップ'},
];

const requiredNumberOfInstruments: SelectorOption[] = [
  {value: '0', label: '0'},
  {value: '1', label: '1'},
  {value: '2', label: '2'},
  {value: '3', label: '3'},
  {value: '4', label: '4'},
  {value: '5', label: '5'},
  {value: '6', label: '6'},
  {value: '7', label: '7'},
  {value: '8', label: '8'},
  {value: '9', label: '9'},
  {value: '10', label: '10'},
]

const recruitedInstruments: SelectorOption[] = [
  {value: '', label: ''},
  {value: 'VOCAL', label: 'ボーカル'},
  {value: 'GITTER', label: 'ギター'},
  {value: 'ELECTRIC_BASE', label: 'エレキベース'},
];

type CheckboxOption = {
  value: string;
  label: string;
};

const requiredGenders: CheckboxOption[] = [
  {value: 'MALE_ONLY', label: '男性'},
  {value: 'MALE_ONLY', label: '女性'},
  {value: 'ALL', label: '不問'},
];

const requiredGenerations: CheckboxOption[] = [
  {value: 'TEEN', label: '10代'},
  {value: 'TWENTIES', label: '20代'},
  {value: 'THIRTIES', label: '30代'},
  {value: 'FORTIES', label: '40代'},
  {value: 'FIFTIES', label: '50代'},
  {value: 'MORE_THAN_SIXTIES', label: '60代以上'},
]

const Recruitment = (props: CreateRecruitmentRequest) => {
  const [songTitle, setSongTitle] = useState(props.songTitle)
  const [artist, setArtist] = useState(props.artist)
  const [genre, setGenre] = useState(props.genre)
  
  const handleGenreChange = (value: string) => {
    setGenre(value); // 値を更新して表示する
  };
  
  const onSubmit = () => {
  }
  
  return (
    <div>
      <p className={styles.headline1}>メンバーを募集する</p>
      <p className={styles.headline2}>募集するコラボの基本情報</p>
      <form onSubmit={event => createRecruitment(event)}>
        <div className={styles.itemsSetVertical}>
          <div className={styles.itemsSetHorizontal}>
            <InputForm id={"songTitle"} name={"songTitle"} title={"曲名"} disabled={false} displayedRequired={false}/>
            <InputForm id={"artist"} name={"artist"} title={"アーティスト名"} disabled={false}
                       displayedRequired={false}/>
          </div>
          {/*選択解除後も文字を白で表示したい*/}
          {/*ドロップダウンリストの下矢印を白で表示したい*/}
          <div className={styles.itemsSetHorizontal}>
            <InputSelector
              title={"ジャンル"}
              name={"genre"}
              options={genres.map(value => value)}
              onChange={handleGenreChange}
              selectedValue={genre}
              disabled={false}
              displayedRequired={true}
            />
            <InputForm id={"name"} name={"name"} title={"コラボ名"} disabled={false} displayedRequired={true}/>
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
              options={requiredGenerations}
            />
          </div>
          <div className={styles.itemsSetHorizontal}>
            <Checkbox
              id={'requiredGenders'}
              title={'性別'}
              name={'requiredGenders'}
              options={requiredGenders}
            />
          </div>
          <div className={styles.itemsSetHorizontal}>
            {/*選択項目が消える*/}
            <InputSelector
              title={"楽器"}
              name={"recruitedInstruments"}
              options={recruitedInstruments.map(value => value)}
              onChange={handleGenreChange}
              selectedValue={genre}
              disabled={false}
              displayedRequired={true}
            />
            <Selector
              name={"numberOfPeople"}
              options={[
                {value: '0', label: '0'},
                {value: '1', label: '1'},
              ]}
              onChange={handleGenreChange}
              selectedValue={genre}
            />
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
              <BorderButton variant={"default"} onClick={onSubmit}>
                下書きに保存する
              </BorderButton>
              <Button variant={"default"} onClick={onSubmit}>
                内容を確認する→
              </Button>
              <br/>
            </div>
          </div>
      </form>
    </div>
);
};

export default Recruitment;