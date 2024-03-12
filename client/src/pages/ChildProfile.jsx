/*
//         We need Sign up and Login
//         const { loading, error, data } = useQuery(QUERY_USER, {
//             variables: {
//                 // Who's logged in?
//                 username: ""
//             }
//         })
//     */



import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
import Confetti from 'react-confetti';
import ProfileAvatar from '../components/Content/ProfileAvatar';


const ChildProfile = () => {
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [existingChores, setExistingChores] = useState([
    { id: 1, name: "Wash Dishes", time: "30 minutes", completed: false, reward: 5 },
    { id: 2, name: "Clean Room", time: "1 hour", completed: false, reward: 10 },
    { id: 3, name: "Take out Trash", time: "15 minutes", completed: false, reward: 3 },
  ]);
  const [selectedChores, setSelectedChores] = useState([]);
  const [newChoreAdded, setNewChoreAdded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [savingsGoal, setSavingsGoal] = useState("New Bike - $100");

  const stackDirection = useBreakpointValue({ base: 'column', md: 'row' });

  const openSelectModal = () => {
    setShowSelectModal(true);
  };

  const closeSelectModal = () => {
    setShowSelectModal(false);
  };

  const addChore = (chore) => {
    setSelectedChores([...selectedChores, chore]);
    setNewChoreAdded(true);
  };

  const completeChore = (choreId) => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);

    const updatedChores = existingChores.map(chore => {
      if (chore.id === choreId) {
        return { ...chore, completed: true };
      }
      return chore;
    });

    setExistingChores(updatedChores);
  };

  const saveSelectedChores = () => {
    setExistingChores([...existingChores, ...selectedChores]);
    setSelectedChores([]);
    setShowSelectModal(false);
  };

  return (
    <Box minH="100vh" p={4}>
      <VStack spacing={8} align="stretch">
        <Box alignSelf="flex-start">
          <ProfileAvatar />
        </Box>
        <Stack direction={stackDirection} spacing={10} justifyContent="center" alignItems="start" width="full">
          <VStack spacing={4} width="full" maxWidth="lg">
            <Text as="h4" fontSize="2xl" color="blue.600" mb={4}>Child Profile</Text>
            <VStack spacing={3} width="100%">
              <Text fontWeight="bold">Existing Chores:</Text>
              {existingChores.map((chore) => (
                <Box key={chore.id} display="flex" justifyContent="space-between" alignItems="center" width="100%">
                  <Text color={chore.completed ? 'gray' : 'black'}>
                    {chore.name} - {chore.time} - Reward: ${chore.reward}
                  </Text>
                  {!chore.completed && (
                    <Button colorScheme="blue" onClick={() => completeChore(chore.id)}>
                      Completed
                    </Button>
                  )}
                  {chore.completed && (
                    <Text>${chore.reward} earned</Text>
                  )}
                </Box>
              ))}
              <Button colorScheme="blue" size="lg" onClick={openSelectModal}>
                Select Chores
              </Button>
            </VStack>
          </VStack>
          <Box p={5} borderWidth="1px" borderRadius="lg" width="full" maxWidth="lg">
            <Text fontSize="xl" fontWeight="bold" mb={3}>Savings Goal</Text>
            <Divider />
            <Text mt={3}>{savingsGoal}</Text>
          </Box>
        </Stack>
        <Modal isOpen={showSelectModal} onClose={closeSelectModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Select Chores</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={3}>
                {newChoreAdded && <Text color="green">You've added a new chore!</Text>}
                <Text fontWeight="bold">Available Chores:</Text>
                {existingChores.filter(chore => !chore.completed).map((chore) => (
                  <Box key={chore.id} display="flex" justifyContent="space-between" alignItems="center" width="100%">
                    <Text>{chore.name} - {chore.time}</Text>
                    <Button colorScheme="green" onClick={() => addChore(chore)}>
                      Add
                    </Button>
                  </Box>
                ))}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={closeSelectModal}>Close</Button>
              <Button colorScheme="green" onClick={saveSelectedChores}>Save</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {showConfetti && <Confetti />}
      </VStack>
    </Box>
  );
};

export default ChildProfile;
