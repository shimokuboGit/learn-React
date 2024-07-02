import { useState, useCallback, useMemo } from 'react';
import './App.css';
import { ChildArea } from './ChildArea';

export default function App() {
  console.log('aaa')
  const [text, setText] = useState()
  const [open, setOpen] = useState(false)
  
  const onChangeText = (e) => setText(e.target.value)

  const onClickOpen = () => setOpen(!open)

  const onClickClose = useCallback(() => setOpen(false), [text])

  const temp = useMemo(() => 1 + 1, [])
  console.log(temp + 'adsf')

  return (
    <div className="App">
      <input value={text} onChange={onChangeText}/>
      <br />
      <br />
      <button onClick={onClickOpen}>表示</button>
      <ChildArea open={open} close={onClickClose} />
    </div>
  );
}
