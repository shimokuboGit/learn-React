import { Box, Heading, FormControl, FormLabel, Input, Textarea, Button, Stack, Select } from "@chakra-ui/react";
import { FC, JSXElementConstructor, Key, memo, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { supabaseClient } from "../../supabase";
import { Skills } from "../../domain/skills";

export const Register: FC = memo(() => {
  const [skillOptions, setSkillOptions] = useState<Skills>()

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
        <FormControl>
          <FormLabel>ID</FormLabel>
          <Input placeholder="IDを入力" focusBorderColor="blue.400" />
        </FormControl>

        <FormControl>
          <FormLabel>名前</FormLabel>
          <Input placeholder="名前を入力" focusBorderColor="blue.400" />
        </FormControl>

        <FormControl>
          <FormLabel>自己紹介</FormLabel>
          <Textarea placeholder="自己紹介を入力" focusBorderColor="blue.400" />
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

        <Button colorScheme="blue" size="lg" mt={6}>
          登録
        </Button>
      </Stack>
    </Box>
  );
});
