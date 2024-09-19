export const InputLearnTitle = (props: { inputText: any; onChange: any }) => {

  const {inputText, onChange} = props
  return (
    <>
      <input placeholder="学習内容" value={inputText} onChange={onChange}></input>
    </>
  )
}