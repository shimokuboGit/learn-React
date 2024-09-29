import { Button as CButton, Text, Box, Flex, useDisclosure, HStack } from '@chakra-ui/react';

import { LearnRecord } from "../../domain/LearnRecord"
import { Button } from "../atoms/Button"
import { styled } from "styled-components"

import { LearnModal } from "./LearnModal";

export const LearnContent = (props: {index: string, record: LearnRecord, onClickRemove: any, onSetLearnRecords: any }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { index, record, onClickRemove, onSetLearnRecords } = props

  const onClickModalOpen = () => onOpen()

  return (
    <Flex flex="1" justify="space-between" align="center" p={2} bg="gray.50" borderRadius="md" boxShadow="sm" mb={4} w="100%">
      <Text fontSize="lg" fontWeight="bold" color="gray.600" w="30%">{record.title}</Text>
      <Text fontSize="sm" color="gray.600">{record.time}時間</Text>
      <HStack>
        <CButton size="sm" mr={3} onClick={onClickModalOpen}>編集</CButton>
        <Button text='削除' onClickRemove={() => onClickRemove(index)} />
      </HStack>
      <LearnModal isOpen={isOpen} onClose={onClose} record={record} isEdit={true} onSetLearnRecords={onSetLearnRecords} />
    </Flex>
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
