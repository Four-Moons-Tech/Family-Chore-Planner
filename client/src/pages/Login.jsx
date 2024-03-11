import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Box, Button, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react";

const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);
    const [errorDisplay, setErrorDisplay] = useState('');

    if (error) {
        console.log("Error logging in:", error.message);
        setErrorDisplay(error.message);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await login({ variables: { ...formState } });
            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }
        setFormState({ email: '', password: '' });
    };

    return (
        <Box display="flex" justifyContent="center" minH="100vh">
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" maxWidth="lg" width="100%" p={8} boxShadow="lg">
                <Text as="h4" fontSize="2xl" color="blue.600" textAlign="center" mb={4}>Login</Text>
                {data ? (
                    <Text textAlign="center">
                        Success! You may now head <Link to="/">back to the homepage.</Link>
                    </Text>
                ) : (
                    <form onSubmit={handleFormSubmit}>
                        <Stack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input id="email" name="email" type="email" value={formState.email} onChange={handleChange} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input id="password" name="password" type="password" value={formState.password} onChange={handleChange} />
                            </FormControl>
                            <Button type="submit" colorScheme="blue" size="lg" width="full">Submit</Button>
                        </Stack>
                    </form>
                )}
                {error && <Text mt={4} color="red.500">{errorDisplay}</Text>}
            </Box>
        </Box>
    );
};

export default Login;

