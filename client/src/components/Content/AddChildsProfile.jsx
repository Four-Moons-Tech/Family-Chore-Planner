import React from "react";
import { useState } from 'react';
import { ADD_USER } from '../../utils/mutations'
// import { ADD_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Radio,
    RadioGroup
} from '@chakra-ui/react'

function AddChildProfile() {
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();


        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const response = await addUser(userFormData);

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const { token, user } = await response.json();
            console.log(user);
            Auth.login(token);
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }

        setUserFormData({
            username: '',
            password: '',
        });
    };
    const { isOpen, onOpen, onClose } = useDisclosure()

    // const initialRef = React.useRef(null)
    // const finalRef = React.useRef(null)

    return (
        <>
            <Button onClick={onOpen}>Create Child User</Button>


            <Modal

                isOpen={isOpen}
                onClose={onClose}

                noValidate validated={validated} onSubmit={handleFormSubmit}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create user account for your family member</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                            {/* show alert if server response is bad */}
                            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                                Something went wrong with your signup!
                            </Alert>

                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='username'>Username</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Your username'
                                    name='username'
                                    onChange={handleInputChange}
                                    value={userFormData.username}
                                    required
                                />
                                <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='email'>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Your email address'
                                    name='email'
                                    onChange={handleInputChange}
                                    value={userFormData.email}
                                    required
                                />
                                <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='password'>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Your password'
                                    name='password'
                                    onChange={handleInputChange}
                                    value={userFormData.password}
                                    required
                                />
                                <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label htmlFor='role'>Role</Form.Label>
                                <RadioGroup name="form-name">
                                    <Radio>Parent</Radio>
                                    <Radio>Child</Radio>
                                </RadioGroup>

                            </Form.Group>
                            <Button
                                disabled={!(userFormData.username && userFormData.email && userFormData.password)}
                                type='submit'
                                variant='success'>
                                Submit
                            </Button>
                        </Form>

                    </ModalBody>

                    <ModalFooter>
                        <Button disabled={!(userFormData.username && userFormData.email && userFormData.password)}
                            type='submit'
                            variant='success'>
                            Submit
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddChildProfile