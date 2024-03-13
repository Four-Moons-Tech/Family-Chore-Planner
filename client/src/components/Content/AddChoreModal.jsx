import React from "react";
import { useState } from 'react';
import { ADD_CHORE, UPDATE_CHORE } from '../../utils/mutations'
// import Auth from '../../auth.js'
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
    onClose,
    childId,
    choreToUpdate = null
}) {
    const [choreFormData, setChoreFormData] = useState({ description: '', payRate: '', dueDate: '', userId: ''});

    const [addChore, { error, data }] = useMutation(choreToUpdate ? UPDATE_CHORE : ADD_CHORE);

    if (error) {
        console.log("Error adding chore:", error)
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setChoreFormData({ ...choreFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {

        try {
            const variables = {
                input: {
                    ...choreFormData,
                    payRate: Number(choreFormData.payRate),
                    userId: childId
                }
            }
            if (choreToUpdate) {
                variables.input.choreId = choreToUpdate.choreId
                variables.input.userId = choreToUpdate.userId
            }
            console.log(variables)
            const test = await addChore({variables});

            // console.log(test);
            onClose()
            location.reload()
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
                    <ModalHeader>{choreToUpdate ? 'Updating' : 'Creating'} a chore</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form onSubmit={handleFormSubmit}>
                            {/* <div className='form-field'>
                                <label htmlFor='text'>ID</label>
                                <input
                                    type='text'
                                    placeholder='UserID'
                                    name='UserID'
                                    onChange={handleInputChange}
                                    value={choreFormData.userId}
                                    required
                                />
                            </div> */}
                            <div className='form-field'>
                                <label htmlFor='username'>Description</label>
                                <input
                                    type='text'
                                    placeholder='Description'
                                    name='description'
                                    onChange={handleInputChange}
                                    defaultValue={choreToUpdate?.description}
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
                                    defaultValue={choreToUpdate?.payRate}
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
                                    defaultValue={choreToUpdate?.dueDate}
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