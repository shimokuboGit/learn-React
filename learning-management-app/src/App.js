import { useEffect, useState } from 'react';
import './App.css';
import { InputLearnRecord } from './components/InputLearnRecord';

export const App = () => {

  const [inputLearnTitle, setInputLearnTitle] = useState('')
  const [inputLearnTime, setInputLearnTime] = useState('')
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')
  const [totalLearnTime, setTotalLearnTime] = useState(0)

  const onChangeLearnTitle = (event) => {
    setInputLearnTitle(event.target.value)
  }

  const onChangeLearnTime = (event) => {
    setInputLearnTime(parseInt(event.target.value))
  }

  const onClickRegister = () => {
    if ((inputLearnTitle || inputLearnTime) === '') {
      setError(true)
      return
    }
    setError(false)

    setRecords([...records, { title: inputLearnTitle, time: inputLearnTime}])
    
    setInputLearnTitle('')
    setInputLearnTime('')
  }
  
  useEffect(() => {
    console.log(records);
    const newTotal = records.reduce((total, value) => total + value.time, 0)
    setTotalLearnTime(newTotal)
  }, [records])

  return (
    <div className="App">
      <header className="App-header">
        <h1>学習記録一覧</h1>
        <InputLearnRecord 
          inputTitle={inputLearnTitle}
          inputTime={inputLearnTime}
          onChangeTitle={onChangeLearnTitle}
          onChangeTime={onChangeLearnTime} 
        />
        
        <button onClick={onClickRegister}>登録</button>
        {error && (<p style={{color: 'red'}}>入力されていない項目があります</p>)}
        <ul> 
        {records.map((record, index) => (
          <li key={index}>
            <p>{record.title} {record.time}時間</p>
          </li>
        ))}
        </ul>
        <div>
          合計時間: {totalLearnTime}/1000(h)
        </div>
      </header>
    </div>
  );
}
