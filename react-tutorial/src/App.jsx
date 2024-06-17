
import { useEffect, useState } from "react"
import {Message} from "./components/Message"

export const App = () => {
  console.log('--app--')
  const [num, setNum] = useState(0)
  const [isShowFace, setIsShowFace] = useState(false)

  const onClickCountUp = () => {
    setNum(num + 1)
  }

  useEffect(() => {
    if (num > 0) {
      if (num % 3 === 0) {
        isShowFace || setIsShowFace(true)
      } else {
        isShowFace && setIsShowFace(false)
      }
    }
    console.log('--useEffect--')
  }, [num])


  const onClickShowFaceToggle = () => {
    setIsShowFace(!isShowFace)
  }

  return (
    <>
      <h1 style={{ color: 'gray' }}>heji!!!</h1>
      <Message color='blue'>WhatsApp</Message>
      <Message color='green'>Im good!</Message>
      <button onClick={onClickCountUp}>count up</button>
      <p>{num}</p>
      <button onClick={onClickShowFaceToggle}>switch</button>
      {isShowFace && <p>^_^</p>}
    </>
  )
}