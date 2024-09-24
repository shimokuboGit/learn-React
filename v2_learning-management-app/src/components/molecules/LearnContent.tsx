import { LearnRecord } from "../../domain/LearnRecord"
import { Button } from "../atoms/Button"
import { styled } from "styled-components"
import { Button as CButton, useDisclosure } from '@chakra-ui/react';

import { LearnModal } from "./LearnModal";

export const LearnContent = (props: {index: string, record: LearnRecord, onClickRemove: any}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { index, record, onClickRemove } = props

  const onClickModalOpen = () => onOpen()

  return (
    <SContainer>
      <SRecord>{record.title} / {record.time}時間</SRecord>
      <CButton onClick={onClickModalOpen}>編集</CButton>
      <Button text='削除' onClickRemove={() => onClickRemove(index)} />
      <LearnModal isOpen={isOpen} onClose={onClose} records={[]} setLearnRecordFunc={function (records: LearnRecord[], id: string, title: string, time: number): void {
        throw new Error("Function not implemented.");}} isEdit={true} />
    </SContainer>
  )
}

const SContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`
const SRecord = styled.p`
  margin-right: 15px;
  flex-grow: 1;
`
