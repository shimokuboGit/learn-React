import { LearnRecords, LearnRecord } from "../../domain/LearnRecord"
import { LearnContent } from "../molecules/LearnContent"

export const LearnContents = (props: {records: LearnRecords, onClickRemove: any}) => {
  const { records, onClickRemove } = props
  return (
    <>
      {records.map((record: LearnRecord) => (
        <li key={record.id}>
          <LearnContent index={record.id!} record={record} onClickRemove={onClickRemove} />
        </li>
      ))}
    </>
  )
}