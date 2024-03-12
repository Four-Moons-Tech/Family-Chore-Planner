


import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import AddChildProfile from '../components/Content/AddChildsProfile';
import ChildCard from '../components/Content/ChildCard';
import {
    useDisclosure,
    Button,
    Flex

} from '@chakra-ui/react'


import { QUERY_USER } from '../utils/queries.js'
import Auth from '../utils/auth.js'


const FamilyProfile = () => {

    const [children, setChildren] = useState([
        {
            username: "test",
            age: "test",
            goal: "test"
        }

    ])


    const { isOpen, onOpen, onClose } = useDisclosure()

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

    return (
        <>
            <Button backgroundColor="purple" margin="50px"  onClick={onOpen}>Create Child User</Button>
            <AddChildProfile
                isOpen={isOpen}
                onClose={onClose}
            />
            <Flex justifyContent="center">
                <section className="portfolio container-fluid text-center pb-5">
                    <div className="row gy-4">
                        {children.map((children, index) => (
                            <div className="col-12 col-md-6 col-lg-4" key={index}>
                                <ChildCard  username={children.username} age={children.age} goal={children.goal} />
                            </div>
                        ))}


                    </div>
                </section>
            </Flex>

        </>
    )



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
};

export default FamilyProfile;
