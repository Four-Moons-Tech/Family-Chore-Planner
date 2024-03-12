/*
//         const { loading, error, data } = useQuery(QUERY_USER, {
//             variables: {
//                 // Who's logged in?
//                 username: ""
//             }
//         })
//     */
//connect chores 
// how close 


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
  useColorModeValue,
} from "@chakra-ui/react";
import Confetti from 'react-confetti';
import ProfileAvatar from '../components/Content/ProfileAvatar';

import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_USER } from '../utils/queries'
import { ADD_CHORE, COMPLETE_CHORE } from '../utils/mutations'

const availableChores = [
  {
    description: 'Do the dishes',
    payRate: 3,
    dueDate: '2024-04-19',

  }
]

const ChildProfile = () => {
  const [showSelectModal, setShowSelectModal] = useState(false);
  // const [existingChores, setExistingChores] = useState([
  //   { id: 1, name: "Wash Dishes", time: "30 minutes", completed: false, reward: 5 },
  //   { id: 2, name: "Clean Room", time: "1 hour", completed: false, reward: 10 },
  //   { id: 3, name: "Take out Trash", time: "15 minutes", completed: false, reward: 3 },
  // ]);
  const [selectedChores, setSelectedChores] = useState([]);
  const [newChoreAdded, setNewChoreAdded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [savingsGoal, setSavingsGoal] = useState("New Bike - $100");

  const stackDirection = useBreakpointValue({ base: 'column', md: 'row' });
  const textColor = useColorModeValue('gray.800', 'white');
  const modalBg = useColorModeValue('white', 'gray.800');
  
  const user = Auth.getProfile()?.data

  const [ _addChore, { 
    error: addChoreError, 
    data: addChoreData, 
    loading: addChoreLoading
  }] = useMutation(ADD_CHORE)

  const [ _completeChore, { 
    error: completeChoreError, 
    data: completeChoreData, 
    loading: completeChoreLoading
  }] = useMutation(COMPLETE_CHORE)

  let { 
    data: queryUserData, 
    error: queryUserError 
  } = useQuery(QUERY_USER, {
      variables: {
          username: user.username
      }
  })
  if (queryUserError) console.dir(queryUserError)
  console.log("QUERY_USER:", queryUserData)


  const openSelectModal = () => {
    setShowSelectModal(true);
  };

  const closeSelectModal = () => {
    setShowSelectModal(false);
  };

  const addChore = (chore) => {
    // setSelectedChores([...selectedChores, chore]);
    _addChore({
      variables: {
        input: {
          ...chore,
          userId: queryUserData.user._id
        }
      }
    })
    if (!addChoreError) {
      setNewChoreAdded(true);
      closeSelectModal()
      location.reload()
    } else {
      alert('failure adding chore')
    }
  };

  const completeChore = (choreId) => {
    _completeChore({
      variables: {
        choreId
      }
    })
    if (!completeChoreError) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      alert('failure completing chore')
    }
    // const updatedChores = existingChores.map(chore => {
    //   if (chore.id === choreId) {
    //     return { ...chore, completed: true };
    //   }
    //   return chore;
    // });

    // setExistingChores(updatedChores);
  };

  const saveSelectedChores = () => {
    setExistingChores([...existingChores, ...selectedChores]);
    setSelectedChores([]);
    setShowSelectModal(false);
  };

  return (
    <Box 
      minH="100vh" 
      p={4}
      backgroundImage="url('/images/amy-shamblen-fEBBSuFusUU-unsplash.jpg')"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center center"
      // bg="yellow.100" //  in case the image fails to load
    >
      <VStack spacing={8} align="stretch" bg="rgba(255, 255, 255, 0.85)" borderRadius="lg" p={5}>
        <Box alignSelf="flex-start">
          <ProfileAvatar />
        </Box>
        <Stack direction={stackDirection} spacing={10} justifyContent="center" alignItems="start" width="full">
          <VStack spacing={4} width="full" maxWidth="lg">
            <Text as="h4" fontSize="2xl" color="blue.600" mb={4}>Child Profile</Text>
            <VStack spacing={3} width="100%">
              <Text fontWeight="bold" color={textColor}>Existing Chores:</Text>
              {queryUserData?.user?.chores?.map((chore) => (
                <Box key={chore.choreId} display="flex" justifyContent="space-between" alignItems="center" width="100%" bg={modalBg} p={3} borderRadius="md">
                  <Text color={chore.completed ? 'gray' : textColor}>
                    {chore.description} - {chore.dueDate} - Reward: ${chore.payRate}
                  </Text>
                  {!chore.completed && (
                    <Button colorScheme="blue" onClick={() => completeChore(chore.choreId)}>
                      Mark as complete
                    </Button>
                  )}
                  {chore.completed && (
                    <Text color="green.500">${chore.payRate} earned</Text>
                  )}
                </Box>
              ))}
              <Button colorScheme="blue" size="lg" onClick={openSelectModal}>
                Select Chores
              </Button>
            </VStack>
          </VStack>
          <Box p={5} borderWidth="1px" borderRadius="lg" width="full" maxWidth="lg" bg={modalBg}>
            <Text fontSize="xl" fontWeight="bold" mb={3} color={textColor}>Savings Goal</Text>
            <Divider />
            <Text mt={3} color={textColor}>{savingsGoal}</Text>
          </Box>
        </Stack>
        <Modal isOpen={showSelectModal} onClose={closeSelectModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Select Chores</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={3}>
                {newChoreAdded && <Text color="green.500">You've added a new chore!</Text>}
                <Text fontWeight="bold" color={textColor}>Available Chores:</Text>
                {availableChores.map((chore) => (
                  <Box key={chore.description} display="flex" justifyContent="space-between" alignItems="center" width="100%" bg={modalBg} p={3} borderRadius="md">
                    <Text color={textColor}>{chore.description} - {chore.dueDate}</Text>
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
