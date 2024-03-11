import React from "react";
import { useState } from 'react';
import {
    Card, 
    CardHeader,
    CardBody,
    CardFooter,
    Image,
    Text,
    Stack,
    Heading,
    List,
    ListItem,
    ListIcon,
    UnorderedList,
    useDisclosure,
    Button
} from '@chakra-ui/react'
import AddChoreModal from "./AddChoreModal";

const ChildCard = function () {
    const { isOpen, onOpen, onClose }= useDisclosure()

    const [childInfo, setChildInfo]=useState({
        username: '',
        email: '',
        lastName: '',
        goal: '', 
        // totalEarnings: ''
    })
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                alt='Child Profile Picture'
            />

            <Stack>
                <CardBody>
                    <Heading size='md'>Child Profile</Heading>

                    <Text py='2'>
                        <UnorderedList>
                            <ListItem>{childInfo.username}</ListItem>
                            <ListItem> {childInfo.age} </ListItem>
                            <ListItem>{childInfo.goal}</ListItem>
                        </UnorderedList>
                    </Text>
                </CardBody>

                <CardFooter>
                    <Button variant='solid' colorScheme='blue'>
                        Edir Profile
                    </Button>
                    <Button onClick={onOpen}>Create Chore</Button> 
                    <AddChoreModal
                        isOpen={isOpen}
                        onClose={onClose}
                    />
                    
                </CardFooter>
            </Stack>
        </Card>
    )


}

export default ChildCard