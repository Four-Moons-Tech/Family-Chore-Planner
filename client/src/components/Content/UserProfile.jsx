import ProfileAvatar from "./ProfileAvatar";
import { useState } from "react";
import {
    ListItem,
    UnorderedList,
    Card, 
    Stack, 
    CardBody, 
    Heading
} from '@chakra-ui/react';


function UserProfile(props) {

    const {
        _id,
        email,
        
        // goal,
        username,
        // showUsername = true,
    } = props


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
                        <Heading size='md'>Username</Heading>
                        <UnorderedList>
                            <ListItem ></ListItem>
                            <ListItem> {username} </ListItem>
                            <ListItem>{email}</ListItem>
                        </UnorderedList>

                    </CardBody>
                </Stack>
            </Card>
        </>

    )
}

export default UserProfile