// import React, { useState, useRef } from "react";


// import { useQuery } from "@apollo/client";


//     const updateProfileImage = () => {
            // when the user clicks "save", set the user's avatar to image
            /*
                const [updateUser, {data, loading, error}] = useMutation(UPDATE_USER)

                updateUser({
                    _id: "id goes here",
                    profileImage: "image goes here"
                })
            */
                // import { gql, useMutation } from '@apollo/client';
                // // Ensure you have imported other necessary dependencies
                
                // // Define your GraphQL mutation
                // const UPDATE_USER = gql`
                //   mutation UpdateUser($id: ID!, $profileImage: String!) {
                //     updateUser(_id: $id, profileImage: $profileImage) {
                //       _id
                //       profileImage
                //     }
                //   }
                // `;
                
                // const ProfileAvatar = () => {
                //     // Component state and other hooks
                //     const [pview, setpview] = useState('');
                //     const fileInputRef = useRef(null);
                    
                //     // Initialize the useMutation hook with the UPDATE_USER mutation
                //     const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER);
                
                //     const updateProfileImage = () => {
                //         // Assuming you have a way to obtain the user's ID and the image to upload
                //         const userId = 'your-user-id'; // This should be dynamically obtained
                //         const profileImage = pview; // The Base64 or URL of the image
                
                //         // Call the mutation
                //         updateUser({
                //             variables: {
                //                 _id: userId,
                //                 profileImage: profileImage
                //             }
                //         });
                
                //         if (error) {
                //             console.log('Error updating user:', error);
                //             // Handle errors, e.g., show a notification
                //         }
                
                //         if (data) {
                //             console.log('User updated:', data);
                //             // Handle success, e.g., show a success message
                //         }
                //     };
                
                //     // Rest of your component including file reading, Avatar editing, etc.
                
                //     // Remember to replace "Save" button onClick with updateProfileImage
                //     return (
                //         <div className="p-4 text-center">
                          
                //             <Button label="Save" onClick={updateProfileImage} />
                          
                //         </div>
                //     );
                // };



import React, { useState, useEffect, useRef } from "react";
import Avatar from 'react-avatar-edit';
import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const ProfileAvatar = () => {
    const [image, setImage] = useState("");
    const [pview, setpview] = useState("");
    const [imageCrop, setImageCrop] = useState(false);
    const [src, setSrc] = useState(null);
    const fileInputRef = useRef();

    // import { gql, useMutation } from '@apollo/client';
    // // Ensure you have imported other necessary dependencies
    
    // // Define your GraphQL mutation
    // const UPDATE_USER = gql`
    //   mutation UpdateUser($id: ID!, $profileImage: String!) {
    //     updateUser(_id: $id, profileImage: $profileImage) {
    //       _id
    //       profileImage
    //     }
    //   }
    // `;
    
    // const ProfileAvatar = () => {
    //     // Component state and other hooks
    //     const [pview, setpview] = useState('');
    //     const fileInputRef = useRef(null);
        
    //     // Initialize the useMutation hook with the UPDATE_USER mutation
    //     const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER);
    
    //     const updateProfileImage = () => {
    //         // Assuming you have a way to obtain the user's ID and the image to upload
    //         const userId = 'your-user-id'; // This should be dynamically obtained
    //         const profileImage = pview; // The Base64 or URL of the image
    
    //         // Call the mutation
    //         updateUser({
    //             variables: {
    //                 _id: userId,
    //                 profileImage: profileImage
    //             }
    //         });
    
    //         if (error) {
    //             console.log('Error updating user:', error);
    //             // Handle errors, e.g., show a notification
    //         }
    
    //         if (data) {
    //             console.log('User updated:', data);
    //             // Handle success, e.g., show a success message
    //         }
    //     };
    
    //     // Rest of your component including file reading, Avatar editing, etc.
    
    //     // Remember to replace "Save" button onClick with updateProfileImage
    //     return (
    //         <div className="p-4 text-center">
    //             {/* Your component JSX */}
    //             <Button label="Save" onClick={updateProfileImage} />
    //             {/* Rest of your JSX */}
    //         </div>
    //     );
    // };


    useEffect(() => {
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            setImage(savedImage);
        }
    }, []);

    const onClose = () => {
        setpview(null);
    };

    const onCrop = (view) => {
        setpview(view);
    };

    const saveCropImage = () => {
        setImageCrop(false);
        setImage(pview);
        // Save the cropped image to local storage
        localStorage.setItem('profileImage', pview);
    };

    const readFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setSrc(e.target.result);
            setImageCrop(true);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="p-4 text-center">
            <div className="flex flex-column justify-content-center align-items-center">
                {image && (
                    <img
                        style={{ width: "200px", height: "200px", borderRadius: "50%", objectFit: "cover", border: "4px solid green" }}
                        src={image}
                        alt="Profile avatar"
                    />
                )}
                <label htmlFor="file-upload" className="mt-3 p-button p-component">
                    Choose File
                </label>
                <input
                    ref={fileInputRef}
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file && file.type.startsWith("image")) {
                            readFile(file);
                        } else {
                            console.log("Incorrect file type:", file?.type);
                        }
                    }}
                />
                <Dialog visible={imageCrop} onHide={() => setImageCrop(false)} header="Update Profile" style={{ width: '50vw' }}>
                    <Avatar
                        width={390}
                        height={295}
                        onCrop={onCrop}
                        onClose={onClose}
                        src={src}
                    />
                    <Button label="Save" icon="pi pi-check" className="mt-2" onClick={saveCropImage} />
                </Dialog>
            </div>
        </div>
    );
};

export default ProfileAvatar;
