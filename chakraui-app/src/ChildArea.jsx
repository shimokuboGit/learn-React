import { memo } from 'react';

const style = {
  width: '100%',
  height: '200px',
  backgroundColor: 'khaki'
}

export const ChildArea = memo((props) => {

  const { open, close } = props
  console.log('childAreaのレンダリング')
  const data = [...Array(2000).keys()]
  data.forEach((d) => { console.log('a')})

  return (
    <>
    {open ? (
      <div style={style}>
        <p>子</p>
        <button onClick={close}>閉じる</button>
      </div>
    ) : null}
    </>
  )
})