export const InputLearnRecord = (props) => {

  const {inputTitle, inputTime, onChangeTitle, onChangeTime} = props

  return (
    <>
      <input placeholder="学習内容" value={inputTitle} onChange={onChangeTitle}></input>
      <input type="number" placeholder="学習時間" value={inputTime} onChange={onChangeTime}></input>
      <p>入力されている学習内容: {inputTitle}</p>
      <p>入力されている学習時間: {inputTime}時間</p>
    </>
  )
}