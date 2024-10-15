import { FC, memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { supabaseClient } from "../../supabase";
import { Profile } from "../../domain/profile";
import { Box, Heading, ListItem, Spinner, UnorderedList, Text, List } from "@chakra-ui/react";

export const Card: FC = memo(() => {
  const [user, setUser] = useState<Profile>()
  const [loading, setLoading] = useState<boolean>(true)

  const userId = useLocation().pathname.split('/')[2]

  useEffect(() => {
    const fetchUser = async () => {
      const { data: fetchUser, error } = await supabaseClient
                                                .from('user_skill')
                                                .select(`
                                                  *,
                                                  users(*),
                                                  skills(*)
                                                `)
                                                .eq('user_id', 'sample_id');

      if (fetchUser && fetchUser.length > 0) {
        const skills: string[] = fetchUser.map(f => f.skills?.name).filter(skill => skill !== undefined)
        const profile = Profile.newProfile(
          fetchUser![0].users!.id,
          fetchUser![0].users!.name,
          fetchUser![0].users!.description,
          fetchUser![0].users?.github_id,
          fetchUser![0].users?.qiita_id,
          fetchUser![0].users?.x_id,
          fetchUser![0].users!.created_at,
          skills
        )
  
        fetchUser ? setUser(profile) : setLoading(true)
      }

      console.log(user);
      
      setLoading(false)
    }
    fetchUser()
  }, [userId])  
  
  if (loading || user === undefined) {
    return (
      <Spinner boxSize='60px'></Spinner>
    )
  } else {
    return (
      <Box padding={4}>
        <Heading as="h2" size="lg">{user.name}</Heading>
        <Text fontSize="md" color="gray.600">{user.description}</Text>
        <Text>{user.github_id && (<a href={user.github_id} target="_blank" rel="noopener noreferrer">GitHub</a>)}</Text>
        <Text>{user.qiita_id && (<a href={user.qiita_id} target="_blank" rel="noopener noreferrer">Qiita</a>)}</Text>
        <Text>{user.x_id && (<a href={user.x_id} target="_blank" rel="noopener noreferrer">X(Twitter)</a>)}</Text>
        <Text fontSize="lg" marginTop={6}>スキル一覧:
          <List>
            {user.skills && user.skills.length > 0 ? (
              user.skills.map((skill, index) => (
                <ListItem key={index}>{skill}</ListItem>
              ))
            ) : (
              <ListItem>スキルが設定されていません。</ListItem>
            )}
          </List>
        </Text>
      </Box>
    )
  }
})