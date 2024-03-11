import React from "react";
import { useState } from 'react';
import { ADD_CHILD } from '../../utils/mutations'

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
    Button
} from '@chakra-ui/react'


function AddChildProfile({
    isOpen,
    onClose
}) {
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [addChild, { error, data }] = useMutation(ADD_CHILD);
    if (error) console.log("Error adding child:", error)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        // event.preventDefault();


        // const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        //     event.preventDefault();
        //     event.stopPropagation();
        // }


        try {
            const variables = {
                ...userFormData,
                parent_id: Auth.getProfile().data._id
            }
            console.log(variables)
            const {parent, child} = await addChild({
                variables
            });

            // const { parent, child } = await response.json();
            console.log(parent, child);
            // Auth.login(token);
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }

        setUserFormData({
            username: '',
            password: '',
        });
    };
    

   

    return (
        <>
          


            <Modal

                isOpen={isOpen}
                onClose={onClose}

                onSubmit={handleFormSubmit}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create user account for your family member</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                    <form onSubmit={handleFormSubmit}>
                        <div className='form-field'>
                            <label htmlFor='username'>Username</label>
                            <input
                                type='text'
                                placeholder='Your username'
                                name='username'
                                onChange={handleInputChange}
                                // value={userFormData.username}
                                required
                            />
                        </div>

                        <div className='form-field'>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                placeholder='Your email address'
                                name='email'
                                onChange={handleInputChange}
                                // value={userFormData.email}
                                required
                            />
                        </div>

                        <div className='form-field'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                placeholder='Your password'
                                name='password'
                                onChange={handleInputChange}
                                // value={userFormData.password}
                                required
                            />
                        </div>
                        {/* <div className='form-field'>
                            <label htmlFor='role'>Role</label>
                            <select name="role" id="role">
                                <option value="parent">Parent</option>
                                <option value="child">Child</option>
                            </select>
                        </div> */}
                        {/* <Button
                            disabled={!(userFormData.username && userFormData.email && userFormData.password)}
                            type='submit'
                        >
                            Submit
                        </Button> */}
                    </form>

                    </ModalBody>

                    <ModalFooter>
                        <Button 
                        // disabled={!(userFormData.username && userFormData.email && userFormData.password)}
                            type='submit'
                            variant='success'
                            onClick={handleFormSubmit}
                            >
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