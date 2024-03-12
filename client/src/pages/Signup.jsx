
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

    if (error) {
        console.log(`Submission error! ${error.message}`);
        console.dir(error)
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const payload = { variables: { ...formState } }
            console.log(payload)
            const { data } = await addUser(payload);
            Auth.login(data.addUser.token);
        } catch (e) {
            // console.dir(e);
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minH="100vh"
            p={8}
            backgroundImage="url('/images/iStock-1422245176.jpg')"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
        >
            <VStack
                spacing={4}
                maxWidth="lg"
                width="full"
                p={8}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="lg"
                bg="rgba(255, 255, 255, 0.8)"
            >
                <Text fontSize="2xl" fontWeight="bold">Sign Up</Text>
                {data ? (
                    <Text>Success! You may now head <Link to="/">back to the homepage.</Link></Text>
                ) : (
                    <form onSubmit={handleFormSubmit}>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input name="username" type="text" value={formState.username} onChange={handleChange} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input name="email" type="email" value={formState.email} onChange={handleChange} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input name="password" type="password" value={formState.password} onChange={handleChange} />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Last Name</FormLabel>
                                <Input name="lastName" type="text" value={formState.lastName} onChange={handleChange} />
                            </FormControl>
                            <Button colorScheme="blue" size="lg" type="submit" width="full">Submit</Button>
                        </VStack>
                    </form>
                )}
                {error && <Text color="red.500">{error.message}</Text>}
            </VStack>
        </Box>
    );
};

export default Signup;
