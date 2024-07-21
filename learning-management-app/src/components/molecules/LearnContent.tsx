import { LearnRecord } from "../../domain/LearnRecord"
import { Button } from "../atoms/Button"
import { styled } from "styled-components"

export const LearnContent = (props: {index: string, record: LearnRecord, onClickRemove}) => {
  const { index, record, onClickRemove } = props
  return (
    <SContainer>
      <SRecord>{record.title} / {record.time}時間</SRecord>
      <Button text='削除' onClickRemove={() => onClickRemove(index)} />
    </SContainer>
  )
}

const SContainer = styled.div`
  display: flex;
  width: 200px;
  align-items: center;
`
const SRecord = styled.p`
  margin-right: 15px;
  flex-grow: 1;
`
