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


function UserProfile({
    _id,
    email,
    age,
    goal,
    username,
}) {

    


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
                            <ListItem>{username} 
                            {/* has {choreCount || 0 } chores. */}
                            is saving for {goal}</ListItem>
                        </UnorderedList>

                    </CardBody>
                </Stack>
            </Card>
        </>

    )
}

export default UserProfile