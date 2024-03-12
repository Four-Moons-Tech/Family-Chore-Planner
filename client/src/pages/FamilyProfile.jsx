


import { useState } from 'react';


import { ADD_USER } from '../utils/mutations';

import { useMutation, useQuery } from '@apollo/client';

import AddChildProfile from '../components/Content/AddChildsProfile';
import ChildCard from '../components/Content/ChildCard';
import {
    useDisclosure,
    Button,
    Flex

} from '@chakra-ui/react'


import { QUERY_ALL_USER, QUERY_USER } from '../utils/queries.js'
import Auth from '../utils/auth.js'
import ChildList from '../components/Content/ChildList.jsx';

const FamilyProfile =()=>{
   const { loading, data } = useQuery(QUERY_ALL_USER);

    const children = data?.users || [];   
    console.log("this is a child", children[0])
    console.log('data', data)
    // const { 
    //     data: userData, 
    //     loading: userLoading, 
    //     error: userError 
    // } = useQuery(QUERY_USER, { variables: { username: Auth.getProfile()?.data.username } })
    // console.log("userData:", userData)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (

        <>
        <Button backgroundColor="purple" margin="50px" onClick={onOpen}>Create Child User</Button>
            <AddChildProfile
                isOpen={isOpen}
                onClose={onClose}
            />
        < ChildList children={children} />
        </>
        
    )
}
 
// const user = Auth.getProfile()?.data
// if (user) {
//     const payload = {
//         variables: {
//             username: user.username
//         }
//     }
//     console.log(payload)
//     let { data, error } = useQuery(QUERY_USER, payload)
//     if (error) console.dir(error)
// }





// const [formState, setFormState] = useState({ username: '', password: '' });
// const [createUser, { error, data }] = useMutation(ADD_USER);

// const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormState({
//         ...formState,
//         [name]: value,
//     });
// };

// const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//         const { data } = await createUser({
//             variables: { ...formState },
//         });
//         console.log('User created:', data.createUser);
//     } catch (e) {
//         console.error(e);
//     }
//     setFormState({
//         username: '',
//         password: '',
//     });
// };

// return (
//     <Box className="flex-row justify-center mb-4">
//         <Box className="col-12 col-lg-10">
//             <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
//                 <Text as="h4" className="card-header bg-dark text-light p-2">Create Child User</Text>
//                 <Box p="4">
//                     {data ? (
//                         <Text>
//                             User created successfully!
//                         </Text>
//                     ) : (
//                         <form onSubmit={handleFormSubmit}>
//                             <Stack spacing={3}>
//                                 <FormControl>
//                                     <FormLabel htmlFor="username">Username</FormLabel>
//                                     <Input
//                                         id="username"
//                                         name="username"
//                                         type="text"
//                                         value={formState.username}
//                                         onChange={handleChange}
//                                     />
//                                 </FormControl>
//                                 <FormControl>
//                                     <FormLabel htmlFor="password">Password</FormLabel>
//                                     <Input
//                                         id="password"
//                                         name="password"
//                                         type="password"
//                                         value={formState.password}
//                                         onChange={handleChange}
//                                     />
//                                 </FormControl>
//                                 <Button
//                                     type="submit"
//                                     colorScheme="blue"
//                                     size="lg"
//                                     isLoading={false}
//                                     loadingText="Submitting"
//                                     style={{ cursor: 'pointer' }}
//                                 >
//                                     Create User
//                                 </Button>
//                             </Stack>
//                         </form>
//                     )}
//                     {error && (
//                         <Box mt={3} p={3} bg="red.500" color="white">
//                             {error.message}
//                         </Box>
//                     )}
//                 </Box>
//             </Box>
//         </Box>
//     </Box>
// );


export default FamilyProfile;
