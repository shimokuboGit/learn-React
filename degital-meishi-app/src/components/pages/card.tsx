import { FC, memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { supabaseClient } from "../../supabase";
import { Profile } from "../../domain/profile";
import { Box, Heading, ListItem, Spinner, Text, List } from "@chakra-ui/react";

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
                                                .eq('user_id', userId);

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
      <Box
        padding={6} 
        borderRadius="md" 
        boxShadow="md" 
        backgroundColor="white"
        color="gray.800"
        transition="0.2s ease"
        fontWeight={1000}
        w={250}
      >
        <Heading as="h2" size="lg" textAlign="center" mb={4} fontWeight="bold">
          {user.name}
        </Heading>
        <div style={{ fontSize: "12px", margin: "4px", width: "90%" }} dangerouslySetInnerHTML={{__html: user.description}}/>
        <Text rel="noopener noreferrer" color="teal.400" fontWeight="semibold" mr={2}>
          {user.github_id && (<a href={user.github_id} target="_blank">GitHub</a>)}
        </Text>
        <Text rel="noopener noreferrer" color="teal.400" fontWeight="semibold" mr={2}>
          {user.qiita_id && (<a href={user.qiita_id} target="_blank" rel="noopener noreferrer">Qiita</a>)}
        </Text>
        <Text rel="noopener noreferrer" color="teal.400" fontWeight="semibold" mr={2}>
          {user.x_id && (<a href={user.x_id} target="_blank" rel="noopener noreferrer">X(Twitter)</a>)}
        </Text>
        <Text fontSize="lg" marginTop={4}>スキル一覧:
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