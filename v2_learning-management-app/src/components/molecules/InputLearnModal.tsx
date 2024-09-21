import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { ChangeEvent, useState, VFC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm, SubmitHandler, Form } from "react-hook-form"

import { useSupabaseClient } from '../../hooks/useSupabaseClient';
import { LearnRecord } from '../../domain/LearnRecord';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  records: LearnRecord[];
  setLearnRecordFunc: (records: LearnRecord[], id: string, title: string, time: number) => void;
};

type Inputs = {
  title: string;
  time: number;
}

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
      return
    }

    const uuid = uuidv4()
    await supabaseClient.from("study-record").insert({ id: uuid, title: inputTitle, time: inputTime })
    setLearnRecordFunc(records, uuid, inputTitle, inputTime)

    reset()
    onClose()
  }
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <form onSubmit={handleSubmit(onRegister)}>
        <ModalContent>
          <ModalHeader>学習記録</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>学習内容</FormLabel>
              <Input {...register("title", { required: true })} onChange={onChangeInputTitle} />
              {errors.title && (<p>内容の入力は必須です</p>)}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>学習時間</FormLabel>
              <Input {...register("time", { 
                  required: "時間の入力は必須です",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "時間の入力は必須です",
                  },
                min: {
                  value: 1,
                  message: "時間は0以上である必要があります"
                }
              })} type="number" onChange={onChangeInputTime} />
              {/* {errors.time && (<p>時間の入力は必須です</p>)} */}
              {errors.time && (<p>{errors.time.message}</p>)}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">登録</Button>
            <Button onClick={() => {onClose(); reset();}}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
