"use client"

import {memo, useState} from "react";

type FizzProps = {
  isFizz: boolean
}

const Fizz = (props: FizzProps) => {
  const { isFizz} = props
  console.log(`Fizz: isFizz = ${isFizz}`)
  return <span>{isFizz ? 'Fizz' : ''}</span>
}

type BuzzProps = {
  isBuzz: boolean
  onClick: () => void
}

const Buzz = memo<BuzzProps>((props) => {
  const { isBuzz, onClick } = props
  console.log(`Buzz: isBuzz = ${isBuzz}`)
  return (
    <span onClick={onClick}>
      {isBuzz ? 'Buzz' : ''}
    </span>
  )
})

export const Parent2 = () => {
  const [count, setCount] = useState(1)
  const isFizz = count % 3 == 0
  const isBuzz = count % 5 == 0

  const onBuzzClick = () => {
    console.log(`Buzz click isBuzz = ${isBuzz}`)
  }
  console.log(`Parent count=${count}`)

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>+ 1</button>
      <p>{`current count: ${count}`}</p>
      <p>
        <Fizz isFizz={isFizz}/>
        <Buzz isBuzz={isBuzz} onClick={onBuzzClick}/>
      </p>
    </div>
  )
}