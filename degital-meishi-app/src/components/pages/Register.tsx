import { Box, Heading, FormControl, FormLabel, Input, Textarea, Button, Stack, Select, Text } from "@chakra-ui/react";
import { FC, JSXElementConstructor, Key, memo, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { supabaseClient } from "../../supabase";
import { Skills } from "../../domain/skills";
import { SubmitHandler, useForm } from "react-hook-form";


type Inputs = {
  id: string,
  name: string,
  description: string
}

export const Register: FC = memo(() => {
  const [skillOptions, setSkillOptions] = useState<Skills>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit = handleSubmit((data) => {alert(JSON.stringify(data))})

  useEffect(() => {
    const fetchSkills = async() => {
      const {data: skills, error} = await supabaseClient.from("skills").select("*")
      if (skills) {
        const validSkills: Skills = Skills.newSkills(
          skills?.map(s => s.name).filter(s => s !== undefined)
        )
        setSkillOptions(validSkills)
      }
    }
    fetchSkills()
  }, [])

  return (
    <Box maxW="600px" mx="auto" p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={6} textAlign="center" size="lg" color="gray.700">
        名刺を登録
      </Heading>

      <Stack spacing={4}>
        <form onSubmit={handleSubmit((data) => onSubmit)}>
          <FormControl>
            <FormLabel>ID</FormLabel>
            <Input {...register("id", { pattern: /^[A-Za-z]+$/ , required: true})} placeholder="IDを入力" focusBorderColor="blue.400" />
            {errors.id && (
              <Text textColor="red">
                {errors.id.type === 'required' && 'IDは必須です'}
                {errors.id.type === 'pattern' && 'IDは英語のみです'}
              </Text>
              )}
          </FormControl>

          <FormControl>
            <FormLabel>名前</FormLabel>
            <Input {...register("name", { required: true })} placeholder="名前を入力" focusBorderColor="blue.400" />
            {errors.name && <Text textColor="red">名前は必須です</Text>}
          </FormControl>

          <FormControl>
            <FormLabel>自己紹介</FormLabel>
            <Textarea {...register("description", { required: true })} placeholder="自己紹介を入力" focusBorderColor="blue.400" />
            {errors.description && <Text textColor="red">自己紹介は必須です</Text>}
          </FormControl>

          <FormControl>
            <FormLabel>好きな技術</FormLabel>
            <Select placeholder="好きな技術を選択" focusBorderColor="blue.400">
              {skillOptions ? skillOptions.names.map((s: string) => (
                <option key={s}>{s}</option>
              ))
              : <></>}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>GitHub ID</FormLabel>
            <Input placeholder="GitHub IDを入力" focusBorderColor="blue.400" />
          </FormControl>

          <FormControl>
            <FormLabel>Qiita ID</FormLabel>
            <Input placeholder="Qiita IDを入力" focusBorderColor="blue.400" />
          </FormControl>

          <FormControl>
            <FormLabel>Twitter (X) ID</FormLabel>
            <Input placeholder="Twitter (X) IDを入力" focusBorderColor="blue.400" />
          </FormControl>

          <Button type="submit" colorScheme="blue" size="lg" mt={6}>
            登録
          </Button>
        </form>
      </Stack>
    </Box>
  );
});
