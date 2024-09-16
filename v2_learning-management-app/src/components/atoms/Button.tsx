export const Button = (props: { text: any; onClickRemove: any }) => {
  const { text, onClickRemove } = props
  return (
    <>
      <button onClick={onClickRemove}>{text}</button>
    </>
  )
}