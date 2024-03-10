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
        lastName: '',
    });
    const [addUser, { error, data, loading }] = useMutation(ADD_USER);
    
    if (loading) console.log("Loading...");

    if (error) console.log(`Submission error! ${error.message}`, error.graphQLErrors);

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
            console.log(Auth.login);

            const { data } = await addUser({
                variables: { ...formState },
            });
            console.log(data);
            
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
                            <FormControl>
                                <FormLabel>Last Name</FormLabel>
                                <Input
                                    placeholder="last name"
                                    name="lastName"
                                    type="text"
                                    value={formState.lastName}
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
