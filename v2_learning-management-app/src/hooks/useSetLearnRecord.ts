import { useEffect, useState } from "react"
import { LearnRecord } from "../domain/LearnRecord"
import { useSupabaseClient } from './useSupabaseClient';
import { preprocessCSS } from "vite";

export const useSetLearnRecord = () => {

  const { supabaseClient } = useSupabaseClient()
  const [records, setRecords] = useState<LearnRecord[]>([])
  const [learnRecordisLoading, setLearnRecordIsLoading] = useState<boolean>(true)

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

  const onSetLearnRecords = async (record: LearnRecord): Promise<void> => {
    const { id, title, time } = record

    // if (records.some((record) => record.id === id)) {
    //   const newRecords: LearnRecord[] = records.map((record) =>
    //   record.id === id
    //     ? { ...record, title, time }
    //     : record
    //   )
    //   newRecords.map((r) => console.log(r))
    //   setRecords(newRecords)
    // } else {
    //   setRecords([...records, { id, title, time }])
    // }

    setRecords((prevRecords) => {
      if (prevRecords.some((r) => r.id === id)) {
        return prevRecords.map((r) => 
          r.id === id
            ? { ...r, title, time }
            : r
          )
      } else {
        return [...prevRecords, { id, title, time }]
      }
    })
  }

  return { records, onSetLearnRecords, learnRecordisLoading, setLearnRecordIsLoading };
}
