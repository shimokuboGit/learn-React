import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { useEffect, useState, ChangeEvent } from 'react';
import './App.css';
import { InputLearnRecord } from './components/InputLearnRecord';
import { LearnRecord } from './domain/LearnRecord';

export const App = () => {
  const supabase = createClient<Database>(import.meta.env.SUPABASE_URL, import.meta.env.SUPABASAE_KEY)

  const [inputLearnTitle, setInputLearnTitle] = useState('')
  const [inputLearnTime, setInputLearnTime] = useState<number>(0);
  const [records, setRecords] = useState<LearnRecord[]>([])
  const [error, setError] = useState<boolean>(false)
  const [totalLearnTime, setTotalLearnTime] = useState(0)

  const onChangeLearnTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setInputLearnTitle(event.target.value)
  }

  const onChangeLearnTime = (event :ChangeEvent<HTMLInputElement>) => {
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
    setInputLearnTime(0)
  }
  
  useEffect(() => {
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
