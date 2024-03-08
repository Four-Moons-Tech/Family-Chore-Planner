
import React, { useState } from 'react';
import { Box, Button, Stack, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import Confetti from 'react-confetti'; // Import Confetti component for fireworks effect
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
// https://www.apollographql.com/docs/react/data/queries
import ProfileAvatar from '../components/Content/ProfileAvatar';

const ChildProfile = () => {
    /*
        We need Sign up and Login
        const { loading, error, data } = useQuery(QUERY_USER, {
            variables: {
                // Who's logged in?
                username: ""
            }
        })
    */
    const [showSelectModal, setShowSelectModal] = useState(false);
    const [existingChores, setExistingChores] = useState([
        { id: 1, name: "Wash Dishes", time: "30 minutes", completed: false },
        { id: 2, name: "Clean Room", time: "1 hour", completed: false },
        { id: 3, name: "Take out Trash", time: "15 minutes", completed: false }
    ]);
    const [selectedChores, setSelectedChores] = useState([]);
    const [newChoreAdded, setNewChoreAdded] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false); // State to control Confetti display

    // data for available chores, need to add more
    const availableChoresData = [
        { id: 4, name: "Feed Pets", time: "20 minutes" },
        { id: 5, name: "Water Plants", time: "10 minutes" },
        { id: 6, name: "Vacuum Floor", time: "45 minutes" }
    ];

    //  handles opening the modal to select chores
    const openSelectModal = () => {
        setShowSelectModal(true);
    };

    //  handlse closing the modal to select chores
    const closeSelectModal = () => {
        setShowSelectModal(false);
    };

    //  handles adding a chore to selected chores
    const addChore = (chore) => {
        setSelectedChores([...selectedChores, chore]);
        setNewChoreAdded(true);
    };

    // handles marking a chore as completed
    const completeChore = (choreId) => {
        setShowConfetti(true); // Show confetti 
        setTimeout(() => setShowConfetti(false), 3000);
        
        // Update the chore status 
        const updatedChores = existingChores.map(chore => {
            if (chore.id === choreId) {
                return { ...chore, completed: true };
            }
            return chore;
        });
        
        setExistingChores(updatedChores);
    };

    //  handles saving selected chores to existing chores
    const saveSelectedChores = () => {
        setExistingChores([...existingChores, ...selectedChores]);
        setSelectedChores([]);
        setShowSelectModal(false);
    };

    return (
        <Box className="flex-row justify-center mb-4">
            <Box className="col-12 col-lg-10">
                <Text as="h4" className="card-header bg-dark text-light p-2">Child Profile</Text>
                <ProfileAvatar />
                <Box p="4">
                    <Stack spacing={3}>
                        {/* Display existing chores */}
                        <Text fontWeight="bold">Existing Chores:</Text>
                        {existingChores.map((chore) => (
                            <Box key={chore.id}>
                                <Text style={{ color: chore.completed ? 'grey' : 'black' }}>
                                    {chore.name} - {chore.time}
                                </Text>
                                {!chore.completed && (
                                    <Button colorScheme="blue" onClick={() => completeChore(chore.id)}>
                                        Completed
                                    </Button>
                                )}
                            </Box>
                        ))}
                        {/* Button to open modal to select chores */}
                        <Button colorScheme="blue" size="lg" onClick={openSelectModal}>
                            Select Chores
                        </Button>
                    </Stack>
                </Box>
            </Box>
            {/* Modal to select chores */}
            <Modal isOpen={showSelectModal} onClose={closeSelectModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Select Chores</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/*  available chores and allow selection */}
                        <Stack spacing={3}>
                            {/* when new chore is added */}
                            {newChoreAdded && (
                                <Text color="green">You've added a new chore!</Text>
                            )}
                            <Text fontWeight="bold">Available Chores:</Text>
                            {availableChoresData.map((chore) => (
                                <Box key={chore.id}>
                                    <Text>{chore.name} - {chore.time}</Text>
                                    <Button colorScheme="green" onClick={() => addChore(chore)}>
                                        Add
                                    </Button>
                                </Box>
                            ))}
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={closeSelectModal}>
                            Close
                        </Button>
                        <Button colorScheme="green" onClick={saveSelectedChores}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {/* Confetti component */}
            {showConfetti && <Confetti />}
            {/* Display "completed" button for each selected chore */}
            {selectedChores.map((chore) => (
                <Box key={chore.id} mt={4}>
                    <Text>{chore.name} - {chore.time}</Text>
                    <Button colorScheme="blue" onClick={() => completeChore(chore.id)}>
                        Completed
                    </Button>
                </Box>
            ))}
        </Box>
    );
};

export default ChildProfile;
