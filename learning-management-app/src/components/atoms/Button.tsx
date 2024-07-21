export const Button = (props) => {
  const { text, onClickRemove } = props
  return (
    <>
      <button onClick={onClickRemove}>{text}</button>
    </>
  )
}