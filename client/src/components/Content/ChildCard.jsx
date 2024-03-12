import React from "react";
import { useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    
    Stack,
    Heading,
    useDisclosure,
    Button
} from '@chakra-ui/react'
import AddChoreModal from "./AddChoreModal";
import ProfileAvatar from "./ProfileAvatar";
// import { UPDATE_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import UserProfile from "./UserProfile";
import ChoreList from "./ChoreList";

const ChildCard = function ({
    child
}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        _id: childId,
        email,
        chores,
        // goal,
        username,
        // showUsername = true,
    } = child
    
    // setChildInfo()

    // const editChildProfile = function () {
    //     const [updateUser, {error}] = useMutation(UPDATE_USER);

    // }
    return (
        <Card 
            backgroundColor={"pink"}
            direction={{ base: 'column', lg: 'row' }}
            overflow='hidden'
            variant='outline'
            display="flex"
            border="1px"
            borderColor="blue"
        >
        <UserProfile 
            _id={childId}
            chores={chores}
            username={username}
            email={email}
        />

            <Stack >
                <CardBody >
                    <Heading size='md'>{username}</Heading>

                    
                    <ChoreList chores={chores}/>
                    

                </CardBody>

                <CardFooter>
                    {/* <Button onClick={onOpen} variant='solid' colorScheme='blue'>
                        Edit Profile
                    </Button> */}
                    <Button onClick={onOpen} variant='solid' colorScheme='blue'>
                        Create Chore</Button>
                    <AddChoreModal
                        isOpen={isOpen}
                        onClose={onClose}
                        childId={childId}
                    />

                </CardFooter>
            </Stack>
        </Card>
    )


}

export default ChildCard