export const Message = ({color, children} = props) => {
  console.log('message----')
  const MessageA = {
    color,
    fontSize: '20px'
  }

  return (
    <p style={MessageA}>{children}</p>
  )
}
