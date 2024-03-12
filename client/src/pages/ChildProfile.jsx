//Profile view for a child user:

//Is abe to login using the username and password creted by a parent
//Is able to select the chores from the list they see in the profile

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";

const ChildProfile = () => {
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

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
            const { data } = await login({
                variables: { ...formState },
            });
            Auth.login(data.login.token);
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
                    <Text as="h4" className="card-header bg-dark text-light p-2">Child Login</Text>
                    <Box p="4">
                        {data ? (
                            <Text>
                                Success! You may now head{' '}
                                <Link to="/">back to the homepage.</Link>
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
                                        Submit
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

export default ChildProfile;
