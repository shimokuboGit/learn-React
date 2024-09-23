import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { useEffect, useState, ChangeEvent } from 'react';
// import './App.css';
import { InputLearnRecord } from './components/InputLearnRecord';
import { LearnRecord } from './domain/LearnRecord';
import { LearnContents } from './components/organisms/LearnContents';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure } from '@chakra-ui/react';
import { InputLearnModal } from './components/molecules/InputLearnModal';
import { v4 as uuidv4 } from 'uuid';
import { useSupabaseClient } from './hooks/useSupabaseClient';


export const App = () => {
  const { supabaseClient } = useSupabaseClient()

  useEffect(() => {
    const fetchLearnRecord = async () => {
      const { data } = await supabaseClient.from("study-record").select()

      const result: LearnRecord[] | undefined = data?.map((d) => {
        return new LearnRecord(d)
      })
      setRecords(result || [])
      setLearnRecordIsLoading(false)
    }
    fetchLearnRecord()
  }, [])
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [inputLearnTitle, setInputLearnTitle] = useState('')
  const [inputLearnTime, setInputLearnTime] = useState<number>(0);
  const [records, setRecords] = useState<LearnRecord[]>([])
  const [isError, setIsError] = useState<boolean>(false)
  const [learnRecordisLoading, setLearnRecordIsLoading] = useState<boolean>(true)
  const [totalLearnTime, setTotalLearnTime] = useState(0)

  const onChangeLearnTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setInputLearnTitle(event.target.value)
  }

  const onChangeLearnTime = (event :ChangeEvent<HTMLInputElement>) => {
    setInputLearnTime(parseInt(event.target.value))
  }

  const setLearnRecordFunc = (records: LearnRecord[], id: string, title: string, time: number): void => {
    setRecords([...records, { id, title, time }])
  }

  const onClickRemove = async (id: string) => {
    const newRecords = records.filter(record => record.id !== id)
    setRecords(newRecords)
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
            {/* <InputLearnRecord 
              inputTitle={inputLearnTitle}
              inputTime={inputLearnTime}
              onChangeTitle={onChangeLearnTitle}
              onChangeTime={onChangeLearnTime} 
            /> */}
            <Button data-testid="register-button" onClick={onClickModalOpen}>新規登録</Button>
            {isError && (<p style={{color: 'red'}}>入力されていない項目があります</p>)}
            <ul> 
              <LearnContents records={records} onClickRemove={onClickRemove} />
            </ul>

            <div>
              合計時間: {totalLearnTime}/1000(h)
            </div>
          </header>
        </div>
        <InputLearnModal isOpen={isOpen} onClose={onClose} records={records} setLearnRecordFunc={setLearnRecordFunc}/>
      </>
    );
  }
}
