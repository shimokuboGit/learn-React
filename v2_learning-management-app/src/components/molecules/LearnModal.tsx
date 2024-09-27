import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { ChangeEvent, useState, VFC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm, SubmitHandler, Form } from "react-hook-form"

import { useSupabaseClient } from '../../hooks/useSupabaseClient';
import { LearnRecord } from '../../domain/LearnRecord';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  record?: LearnRecord;
  isEdit?: boolean;
  onSetLearnRecords: (record: LearnRecord) => void;
};

type Inputs = {
  title: string;
  time: number;
}

export const LearnModal: VFC<Props> = ({ isOpen, onClose, record, isEdit=false, onSetLearnRecords }) => {

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
    if (isEdit) {
      await supabaseClient
        .from("study-record")
        .update({title: inputTitle, time: inputTime})
        .eq('id', record!.id!)
      onSetLearnRecords(new LearnRecord({id: record!.id!, title: inputTitle, time: inputTime}))
    } else {
      const uuid = uuidv4()
      await supabaseClient.from("study-record").insert({ id: uuid, title: inputTitle, time: inputTime })
      onSetLearnRecords(new LearnRecord({id: uuid, title: inputTitle, time: inputTime}))
    }

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
          <ModalHeader>{isEdit ? "記録編集" : "新規登録"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>学習内容</FormLabel>
              <Input
                {...register("title", { required: true })}
                onChange={onChangeInputTitle}
                defaultValue={isEdit ? record.title : ""}
              />
              {errors.title && (<p>内容の入力は必須です</p>)}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>学習時間</FormLabel>
              <Input
                {...register("time", 
                  {
                  required: "時間の入力は必須です",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "時間の入力は必須です",
                  },
                  min: {
                    value: 1,
                    message: "時間は0以上である必要があります"
                  }
                })}
                type="number"
                onChange={onChangeInputTime}
                defaultValue={isEdit ? record.time : ""}
              />
              {errors.time && (<p>{errors.time.message}</p>)}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button data-testid="modal-register-button" colorScheme="blue" mr={3} type="submit">登録</Button>
            <Button onClick={() => {onClose(); reset();}}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
