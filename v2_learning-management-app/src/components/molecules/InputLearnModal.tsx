import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { ChangeEvent, useState, VFC } from 'react';
import { useSupabaseClient } from '../../hooks/useSupabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { LearnRecord } from '../../domain/LearnRecord';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  records: LearnRecord[];
  setLearnRecordFunc: (records: LearnRecord[], id: string, title: string, time: number) => void;
};

export const InputLearnModal: VFC<Props> = ({ isOpen, onClose, records, setLearnRecordFunc }) => {

  const { supabaseClient } = useSupabaseClient()
  const [inputTitle, setInputTitle] = useState('')
  const [inputTime, setInputTime] = useState<number>(0);

  const onChangeInputTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value)
  }

  const onChangeInputTime = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTime(parseInt(event.target.value))
  }

  const onRegister = async () => {
    if (inputTitle === '') {
      alert('error')
      return
    }

    const uuid = uuidv4()
    await supabaseClient.from("study-record").insert({ id: uuid, title: inputTitle, time: inputTime })
    setLearnRecordFunc(records, uuid, inputTitle, inputTime)

    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>学習記録</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>学習内容</FormLabel>
            <Input onChange={onChangeInputTitle} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>学習時間</FormLabel>
            <Input type="number" onChange={onChangeInputTime} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onRegister}>登録</Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
