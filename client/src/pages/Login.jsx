import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
// - change the login to only username and password reqs
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";

// npm i @chakra-ui/react @apollo/client react-router-dom

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <Box className="flex-row justify-center mb-4">
            <Box className="col-12 col-lg-10">
                <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Text as="h4" className="card-header bg-dark text-light p-2">Login</Text>
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
                                        <FormLabel htmlFor="email">Email address</FormLabel>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formState.email}
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

export default Login;
