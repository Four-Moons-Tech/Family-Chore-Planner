


import { useState } from 'react';


import { ADD_USER } from '../utils/mutations';

import { useMutation, useQuery } from '@apollo/client';

import AddChildProfile from '../components/Content/AddChildsProfile';
import ChildCard from '../components/Content/ChildCard';
import {
    useDisclosure,
    Button,
    Flex,
    Box

} from '@chakra-ui/react'


import { QUERY_ALL_USER, QUERY_USER } from '../utils/queries.js'
import Auth from '../utils/auth.js'
import ChildList from '../components/Content/ChildList.jsx';
import Greeting from '../components/Content/Greeting.jsx';

const FamilyProfile = () => {
    const { loading, data } = useQuery(QUERY_ALL_USER);

    const children = data?.users || [];
    console.log("this is a child", children[0])
    console.log('data', data)

    const { isOpen, onOpen, onClose } = useDisclosure()
    // const {
    //     _id: childId,
    //     lastName,
    //     username,
    // } = child
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


            <Greeting
            // _id={childId}
            // username={username}
            // lastName={lastName}
            />
            <Button backgroundColor="#432388" color="white" margin="50px" onClick={onOpen}>Create Child User</Button>
            <AddChildProfile
                isOpen={isOpen}
                onClose={onClose}
            />
            < ChildList children={children} />

        </Box>

    )
}



export default FamilyProfile;
