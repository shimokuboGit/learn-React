import { useEffect, useState } from 'react';
import './App.css';
import { LearnContents } from './components/organisms/LearnContents';
import { Button, Box, Text, Heading, VStack, Flex, Spinner, Alert, AlertIcon, useDisclosure } from '@chakra-ui/react';
import { LearnModal } from './components/molecules/LearnModal';
import { useSupabaseClient } from './hooks/useSupabaseClient';
import { useSetLearnRecord } from './hooks/useSetLearnRecord';

export const App = () => {
  const { supabaseClient } = useSupabaseClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { records, setRecords, onSetLearnRecords, learnRecordisLoading } = useSetLearnRecord();
  const [totalLearnTime, setTotalLearnTime] = useState(0);

  const onClickRemove = async (id: string) => {
    const newRecords = records.filter((record) => record.id !== id);
    setRecords(newRecords);
    await supabaseClient.from("study-record").delete().eq('id', id);
  };

  useEffect(() => {
    const newTotal = records.reduce((total, value) => total + (value.time || 0), 0);
    setTotalLearnTime(newTotal);
  }, [records]);

  const onClickModalOpen = () => onOpen();

  if (learnRecordisLoading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  } else {
    return (
      <Box className="App" padding="5" maxW="1200px" margin="0 auto">
        <header className="App-header">
          <VStack spacing={6} align="center">
            <Heading as="h1" size="xl" color="teal.500">
              LEARNING RECORD3
            </Heading>

            <Button data-testid="register-button" onClick={onClickModalOpen} colorScheme="teal" size="lg">
              新規登録
            </Button>

            <VStack spacing={4} w="100%">
              <LearnContents
                records={records}
                onClickRemove={onClickRemove}
                onSetLearnRecords={onSetLearnRecords}
              />
            </VStack>

            <Text fontSize="lg" fontWeight="bold">
              合計時間: {totalLearnTime}/1000(h)
            </Text>
          </VStack>
        </header>

        <LearnModal isOpen={isOpen} onClose={onClose} onSetLearnRecords={onSetLearnRecords} />
      </Box>
    );
  }
};
