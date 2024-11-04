"use client"

import React, {useState} from "react";
import {createRecruitment} from "@/app/collab/recruitment/component/createRecruitment";
import Button from "@/components/atoms/button/Button";
import BorderButton from "@/components/atoms/button/BorderButton";
import InputForm from "@/components/molecules/input-form/InputForm";
import * as styles from "./collab.css"
import InputSelector from "@/components/molecules/input-selector/InputSelector";
import InputCalendar from "@/components/molecules/input-calendar/InputCalendar";
import Checkbox from "@/components/atoms/checkbox/Checkbox";

type SelectorOption = {
  value: string;
  label: string;
}

const genres: SelectorOption[] = [
  {value: '', label: ''},
  {value: 'Rock', label: 'ロック'},
  {value: 'Jazz', label: 'ジャズ'},
  {value: 'Pop', label: 'ポップ'},
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


const Recruitment = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  
  const handleChange = (value: string) => {
    setSelectedValue(value); // 値を更新して表示する
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
            <InputForm id={"songTitle"} name={"songTitle"} title={"曲名"} disabled={false}/>
            <InputForm id={"artist"} name={"artist"} title={"アーティスト名"} disabled={false}/>
          </div>
          {/*選択解除後も文字を白で表示したい*/}
          {/*ドロップダウンリストの下矢印を白で表示したい*/}
          <div className={styles.itemsSetHorizontal}>
            <InputSelector
              title={"ジャンル"}
              name={"genre"}
              options={genres.map(value => value)}
              onChange={handleChange}
              selectedValue={selectedValue}
              disabled={false}
            />
            <InputForm id={"name"} name={"name"} title={"コラボ名"} disabled={false}/>
          </div>
          <div className={styles.itemsSetHorizontal}>
            <InputCalendar id={"deadline"} title={"募集締切日"} name={"deadline"} disabled={false}/>
          </div>
          <p className={styles.headline2}>応募するメンバー</p>
          {/*チェックボックスの選択肢を自動で表示したい*/}
          <div className={styles.itemsSetHorizontal}>
            <div className={styles.itemsSetHorizontal}>
              <Checkbox
                id={'requiredGenerations'}
                title={'年齢'}
                name={'requiredGenerations'}
                options={requiredGenerations}
              />
            </div>
          </div>
          <div className={styles.itemsSetHorizontal}>
            <Checkbox
              id={'requiredGenders'}
              title={'性別'}
              name={'requiredGenders'}
              options={requiredGenders}
            />
          </div>
        </div>
        <Button variant={"default"} onClick={onSubmit}>
          登録する
        </Button>
        <br/>
        <BorderButton variant={"default"} onClick={onSubmit}>
          登録する
        </BorderButton>
      </form>
    </div>
  );
};

export default Recruitment;