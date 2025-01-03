'use client'

import React from "react";
import Required from "@/shared/ui/atoms/required/Required";
import TextBox, {TextBoxProps} from "@/shared/ui/atoms/textbox/TextBox";
import * as styles from "./InputForm.css";


type Props = {
  title: string
  displayedRequired: boolean
  textBoxProps: TextBoxProps
}

const InputForm: React.FC<Props> = ({
  title,
  displayedRequired,
  textBoxProps,
  ...props
}) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.titleContainer}>
        {title}
        <Required displayed={displayedRequired}/>
      </div>
      <TextBox
        isDisabled={textBoxProps.isDisabled}
        onChange={textBoxProps.onChange}
        {...props}
      />
    </div>
  )
}

export default InputForm