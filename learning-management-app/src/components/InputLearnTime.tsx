export const InputLearnTime = (props: { inputText: any; onChange: any; }) => {

  const {inputText, onChange} = props
  console.log(inputText);
  return (
    <>
      <input type="number" placeholder="学習時間" value={inputText} onChange={onChange}></input>
    </>
  )
}