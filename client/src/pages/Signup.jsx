import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Box, Button, FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react';

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Box width="100%" display="flex" justifyContent="center" mb="4">
            <VStack width="100%" maxWidth="lg">
                <Box bg="gray.100" p="6" borderRadius="md" boxShadow="md">
                    <Text fontSize="xl" fontWeight="bold" mb="4">Sign Up</Text>
                    {data ? (
                        <Text mb="4">Success! You may now head <Link to="/">back to the homepage.</Link></Text>
                    ) : (
                        <form onSubmit={handleFormSubmit}>
                            <FormControl>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    placeholder="Your username"
                                    name="username"
                                    type="text"
                                    value={formState.username}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    placeholder="Your email"
                                    name="email"
                                    type="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    placeholder="******"
                                    name="password"
                                    type="password"
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <Button mt="4" colorScheme="blue" type="submit">Submit</Button>
                        </form>
                    )}
                    {error && (
                        <Text mt="4" color="red.600">{error.message}</Text>
                    )}
                </Box>
            </VStack>
        </Box>
    );
};

export default Signup;
