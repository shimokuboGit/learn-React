import { useCallback, useState } from "react"
import { LearnRecord } from "../domain/LearnRecord";

type Props = {
  id: string;
  learnRecords: Array<LearnRecord>
}

export const useSelectLearnRecord = () => {
  const [selectLearnRecord, setSelectLearnRecord] = useState<LearnRecord | null>(null);

  const onSelectLearnRecord = useCallback((props: Props) => {
    const { id, learnRecords } = props
    const targetLearnRecord = learnRecords.find((learnRecord) => learnRecord.id === id)
    setSelectLearnRecord(targetLearnRecord ?? null)
  }, [])

  return { selectLearnRecord, onSelectLearnRecord };
}