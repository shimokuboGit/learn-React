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

  return { records, setRecords, onSetLearnRecords, learnRecordisLoading, setLearnRecordIsLoading };
}
