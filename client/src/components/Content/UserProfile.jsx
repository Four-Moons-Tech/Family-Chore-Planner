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


function UserProfile() {

    const [UserInfo, setUserInfo] = useState({
        username: '',
        email: '',
        age: '',
        lastName: '',
        goal: '',
        role: '',
        // totalEarnings: ''



    })


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
                            <ListItem> {UserInfo.age} </ListItem>
                            <ListItem>{UserInfo.goal}</ListItem>
                        </UnorderedList>

                    </CardBody>
                </Stack>
            </Card>
        </>

    )
}

export default UserProfile