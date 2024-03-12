import React from "react";
import { useState } from 'react';
import { ADD_CHORE } from '../../utils/mutations'

import { useMutation } from '@apollo/client';

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

const AddChoreModal = function ({
    isOpen,
    onClose
}) {
    const [choreFormData, setChoreFormData] = useState({ description: '', payRate: '', dueDate: '', userId: ''});

    const [addChore, { error, data }] = useMutation(ADD_CHORE);
    if (error) console.log("Error adding chore:", error)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setChoreFormData({ ...choreFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {

        try {
            const variables = {
                ...choreFormData,
                choreId: chore.id
            }
            console.log(variables)
            const { chore } = await addChore({
                variables: {input: {...choreFormData}}
            });

            console.log(chore);

        } catch (err) {
            console.error(err);
        }

        setChoreFormData({
            description: '',
            payRate: '',
            dueDate: ''
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
                                <label htmlFor='text'>ID</label>
                                <input
                                    type='text'
                                    placeholder='UserID'
                                    name='UserID'
                                    onChange={handleInputChange}
                                    value={choreFormData.userId}
                                    required
                                />
                            </div>
                            <div className='form-field'>
                                <label htmlFor='username'>Description</label>
                                <input
                                    type='text'
                                    placeholder='Description'
                                    name='description'
                                    onChange={handleInputChange}
                                    value={choreFormData.description}
                                    required
                                />
                            </div>

                            <div className='form-field'>
                                <label htmlFor='email'>Pay Rate</label>
                                <input
                                    type='text'
                                    placeholder='Pay Rate'
                                    name='payRate'
                                    onChange={handleInputChange}
                                    value={choreFormData.payRate}
                                    required
                                />
                            </div>

                            <div className='form-field'>
                                <label htmlFor='dueDate'>Due Date</label>
                                <input
                                    type='date'
                                    placeholder='Due Date'
                                    name='dueDate'
                                    onChange={handleInputChange}
                                    value={choreFormData.dueDate}
                                    required
                                />
                            </div>
                        </form>

                    </ModalBody>

                    <ModalFooter>
                        <Button
                            disabled={!(choreFormData.description && choreFormData.payRate && choreFormData.dueDate)}
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






export default AddChoreModal