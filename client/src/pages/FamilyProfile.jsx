//Profile for an admin/parent user: 

//Suppose to be able to create the child user - with a username and password only
//Assign chores to a child
//See al children/their schedule
//Link to a Family calendar?(optional, if we have time left)


import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";

const FamilyProfile = () => {
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [createUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await createUser({
                variables: { ...formState },
            });
            console.log('User created:', data.createUser);
        } catch (e) {
            console.error(e);
        }
        setFormState({
            username: '',
            password: '',
        });
    };

    return (
        <Box className="flex-row justify-center mb-4">
            <Box className="col-12 col-lg-10">
                <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Text as="h4" className="card-header bg-dark text-light p-2">Create Child User</Text>
                    <Box p="4">
                        {data ? (
                            <Text>
                                User created successfully!
                            </Text>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <Stack spacing={3}>
                                    <FormControl>
                                        <FormLabel htmlFor="username">Username</FormLabel>
                                        <Input
                                            id="username"
                                            name="username"
                                            type="text"
                                            value={formState.username}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="password">Password</FormLabel>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={formState.password}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        colorScheme="blue"
                                        size="lg"
                                        isLoading={false}
                                        loadingText="Submitting"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Create User
                                    </Button>
                                </Stack>
                            </form>
                        )}
                        {error && (
                            <Box mt={3} p={3} bg="red.500" color="white">
                                {error.message}
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default FamilyProfile;
