import { Box, Heading, FormControl, FormLabel, Input, Textarea, Button, Stack, Select, Text } from "@chakra-ui/react";
import { FC, memo, useEffect, useState } from "react";
import { supabaseClient } from "../../supabase";
import { Skills } from "../../domain/skills";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Inputs = {
  id: string,
  name: string,
  description: string,
  skill: string,
  gitHubId: string,
  qiitaId: string,
  xId: string
}

export const Register: FC = memo(() => {
  const navigate = useNavigate()
  const [skillOptions, setSkillOptions] = useState<Skills>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit = async(input: Inputs) => {
    const { data: usersData, error: usersError } = await supabaseClient.from('users').insert([
      { id: input.id, name: input.name, description: input.description,  github_id: input.gitHubId, qiita_id: input.qiitaId, x_id: input.xId }
    ]).select()

    if (usersError) {
      console.log('fail register user: ' + usersError.message);
      return;
    }

    const { data: skillData } = await supabaseClient.from('skills').select('*').eq('name', input.skill)

    const { data: userSkillData, error: userSkillError} = await supabaseClient.from('user_skill').insert([
      { user_id: input.id, skill_id: skillData![0]?.id }
    ]).select()

    if (userSkillError) {
      console.log('fail register skill: ' + userSkillError.message);
      return;
    }

    navigate('/')
  }

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
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <Select {...register("skill")} placeholder="好きな技術を選択" focusBorderColor="blue.400">
              {skillOptions ? skillOptions.names.map((s: string) => (
                <option key={s}>{s}</option>
              ))
              : <></>}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>GitHub ID</FormLabel>
            <Input {...register("gitHubId")} placeholder="GitHub IDを入力" focusBorderColor="blue.400" />
          </FormControl>

          <FormControl>
            <FormLabel>Qiita ID</FormLabel>
            <Input {...register("qiitaId")} placeholder="Qiita IDを入力" focusBorderColor="blue.400" />
          </FormControl>

          <FormControl>
            <FormLabel>Twitter (X) ID</FormLabel>
            <Input {...register("xId")} placeholder="Twitter (X) IDを入力" focusBorderColor="blue.400" />
          </FormControl>

          <Button type="submit" colorScheme="blue" size="lg" mt={6}>
            登録
          </Button>
        </form>
      </Stack>
    </Box>
  );
});
