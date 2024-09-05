import { Box, Stack, Image, Text, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalFooter } from "@chakra-ui/react"
import { ChangeEvent, memo, useEffect, useState, VFC } from "react"
import { User } from "../../../types/api/user";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";

type Props = {
  user: User | null;
  isAdmin?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export const UserDetailModal: VFC<Props> = memo((props) => {
  const { user, isAdmin, isOpen, onClose } = props

  const [userName, setUserName] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  useEffect(() => {
    setUserName(user?.username ?? "")
    setName(user?.name ?? "")
    setEmail(user?.email ?? "")
    setPhone(user?.phone ?? "")
  }, [user])
  
  const update = () => {
    alert("update function unimplemented")
  }
  function onChangeUserName(event: ChangeEvent<HTMLInputElement>): void {
    setUserName(event.target.value)
  }

  function onChangeName(event: ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value)
  }

  function onChangeEmail(event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value)
  }

  function onChangePhone(event: ChangeEvent<HTMLInputElement>): void {
    setPhone(event.target.value)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>ユーザー詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>名前</FormLabel>
              <Input value={userName} onChange={onChangeUserName} isReadOnly={!isAdmin} />
              <FormLabel>フルネーム</FormLabel>
              <Input value={name} onChange={onChangeName} isReadOnly={!isAdmin} />
              <FormLabel>Mail</FormLabel>
              <Input value={email} onChange={onChangeEmail} isReadOnly={!isAdmin} />
              <FormLabel>TEL</FormLabel>
              <Input value={phone} onChange={onChangePhone} isReadOnly={!isAdmin} />
            </FormControl>
          </Stack>
        </ModalBody>
        {isAdmin && (
          <ModalFooter>
            <PrimaryButton onClick={update}>更新</PrimaryButton>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
})
