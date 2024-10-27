import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react"
import { ChangeEvent, FC, memo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabaseClient } from "../../supabase"

export const Top: FC = memo(() => {
  const navigate = useNavigate()
  const [inputId, setInputId] = useState<string>()
  const [isNoExistError, setIsNoExistError] = useState<boolean>(true)

  const validateExistId = async(inputId: string) => {
    const { data, error } = await supabaseClient.from('users').select('*').eq('id', inputId)
    if (!data || data.length === 0) {
      setIsNoExistError(true)
    } else {
      setIsNoExistError(false)
    }
  }

  const onChengeInputId = (event: ChangeEvent<HTMLInputElement>) => {
    setInputId(event?.target.value)
    inputId && validateExistId(event.target.value)
  }

  const onClickSearch = () => {
    navigate(`/card/${inputId}`)
  }

  return (
    <Box maxW="600px" mx="auto" p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={6} textAlign="center" size="lg" color="gray.700">
        名刺を検索
      </Heading>

      <Stack spacing={4}>
        <FormControl>
          <FormLabel>ID</FormLabel>
          <Input value={inputId} onChange={onChengeInputId}></Input>
          {isNoExistError && <Text color="red">ユーザーが見つかりません</Text>}
        </FormControl>

        <Button onClick={onClickSearch} disabled={isNoExistError} colorScheme="blue" size="lg" mt={6}
          _disabled={{
            bg: "gray.400",
            cursor: "not-allowed",
            color: "white"
          }}>
          検索
        </Button>
      </Stack>
    </Box>
  )
});
