import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { useEffect, useState, ChangeEvent } from 'react';
// import './App.css';
import { InputLearnRecord } from './components/InputLearnRecord';
import { LearnRecord, LearnRecords } from './domain/LearnRecord';
import { LearnContents } from './components/organisms/LearnContents';
import { Button, useDisclosure } from '@chakra-ui/react';
import { LearnModal } from './components/molecules/LearnModal';
import { useSupabaseClient } from './hooks/useSupabaseClient';
import { useSetLearnRecord } from './hooks/useSetLearnRecord';

export const App = () => {
  const { supabaseClient } = useSupabaseClient()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { records, onSetLearnRecords, learnRecordisLoading } = useSetLearnRecord()
  // const [records, setRecords] = useState<LearnRecord[]>([])
  const [isError, setIsError] = useState<boolean>(false)
  // const [learnRecordisLoading, setLearnRecordIsLoading] = useState<boolean>(true)
  const [totalLearnTime, setTotalLearnTime] = useState(0)

  const onClickRemove = async (id: string) => {
    const newRecords = records.filter(record => record.id !== id)
    // TODO
    // setRecords(newRecords)
    await supabaseClient.from("study-record").delete().eq('id', id)
  }
  
  useEffect(() => {
    const newTotal = records.reduce((total, value) => total + (value.time || 0), 0)
    setTotalLearnTime(newTotal)
  }, [records])

  const onClickModalOpen = () => onOpen()

  if (learnRecordisLoading) {
    return ( <h1>Loading...</h1> )
  } else {
    return (
      <>
        <div className="App">
          <header className="App-header">
            <h1>LEARNING RECORD3</h1>
            <Button data-testid="register-button" onClick={onClickModalOpen}>新規登録</Button>
            {isError && (<p style={{color: 'red'}}>入力されていない項目があります</p>)}
            <ul> 
              <LearnContents records={records} onClickRemove={onClickRemove} onSetLearnRecords={onSetLearnRecords} />
            </ul>

            <div>
              合計時間: {totalLearnTime}/1000(h)
            </div>
          </header>
        </div>
        <LearnModal isOpen={isOpen} onClose={onClose} onSetLearnRecords={onSetLearnRecords} />
      </>
    );
  }
}
