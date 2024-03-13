import ProfileAvatar from "./ProfileAvatar";
import { useState } from "react";
// import React from 'react'
// React.useState()
import {
    ListItem,
    UnorderedList,
    Card, 
    Stack, 
    CardBody, 
    Heading
} from '@chakra-ui/react';


function UserProfile({
    _id,
    email,
    age,
    goal,
    username,
}) {

    // const {
    //     _id,
    //     email,
    //     age,
    //     goal,
    //     username,
        
    // } = props


    return (
        <>
            <Card
                direction={{ base: 'column', lg: 'row' }}
                overflow='hidden'
                variant='outline'
            >
                < ProfileAvatar />

                <Stack>
                    <CardBody margin="10px">
                        <Heading size='md'>{username}</Heading>
                        <UnorderedList>
                            
                            <ListItem> {age||'???'} years old </ListItem>
                            <ListItem>{email}</ListItem>
                            <ListItem>{username} is saving for {goal}</ListItem>
                        </UnorderedList>

                    </CardBody>
                </Stack>
            </Card>
        </>

    )
}

export default UserProfile