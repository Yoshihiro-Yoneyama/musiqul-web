'use client'

import React, {ChangeEvent, ReactNode, useState} from 'react'
import {Input as AriaInput} from 'react-aria-components'
import {inputStyles} from '@/shared/ui/util/Input.css'
import {clsx} from 'clsx'
import {fontSize} from '@/shared/themes/fontSize.css'
import {fontWeight} from '@/shared/themes/fontWeight.css'
import {color} from '@/shared/themes/color.css'
import {lineHeight} from '@/shared/themes/lineHeight.css'

export type TextBoxProps = {
  readonly children?: ReactNode
  readonly size?: keyof typeof fontSize
  readonly weight?: keyof typeof fontWeight
  readonly color?: keyof typeof color
  readonly lineHeight?: keyof typeof lineHeight
  readonly as?: string
  readonly type?: string
  readonly inputValue?: string
  readonly valueType?: string | number | undefined
  readonly placeholder?: string
  // readonly errorMessages?: string
  // readonly isInvalid?: boolean
  readonly isDisabled?: boolean
  readonly onChange?: (value: string) => void
  readonly autoComplete?: string
  // readonly maxLength?: number
  readonly testId?: string
  readonly readOnly?: boolean
  readonly ref?: React.Ref<HTMLInputElement>
}

const TextBox = ({
  children = '',
  size = 'l',
  weight = 'regular',
  color = 'black',
  lineHeight = 'l',
  as = 'p',
  isDisabled,
  onChange,
  autoComplete,
  readOnly,
  ref,
  ...props
}: TextBoxProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [inputValue, setInputValue] = useState('')
  
  // React 19: React Compiler will optimize these handlers automatically
  const handleFocus = () => {
    if (!isDisabled) {
      setIsFocused(true)
    }
  }
  
  const handleBlur = () => {
    setIsFocused(false)
    setIsActive(inputValue.trim().length > 0)
  }
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Do nothing if input is disabled
    if (isDisabled) return
    
    const value = event.target.value
    // Update Local State
    setInputValue(value)
    
    // Call onChange to notify the parent component
    if (onChange) onChange(value)
  }
  
  return (
    <>
      <AriaInput
        ref={ref}
        className={clsx(
          inputStyles.default,
          isFocused && !isDisabled ? inputStyles.focused : '',
          isActive && !isFocused && !isDisabled ? inputStyles.active : '',
          isDisabled ? inputStyles.disabled : ''
        )}
        value={inputValue}
        disabled={isDisabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        autoComplete={autoComplete}
        readOnly={readOnly}
        {...props}
      >
      </AriaInput>
    </>
  )
}

// React 19: React Compiler handles memoization automatically
export default TextBox