import React, { useState, useRef } from "react";

import Avatar from 'react-avatar-edit';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";

import { useQuery } from "@apollo/client";

// npm i react-avatar-edit primereact


const ProfileAvatar = function () {
    const [image, setImage] = useState("")
    const [imageCrop, setImageCrop] = useState(false)
    const [src, setsrs] = useState(false)
    const [profile, setProfile] = useState([]);
    const [pview, setpview] = useState(false);

    const profilFinal = profile.map((item) => item.pview);

    const onClose = () => {
        setpview(null);
    };
    const onCrop = (view) => {
        setpview(view);
    }
    const saveCropImage = () => {
        setProfile([...profile, { pview }]);
        setImageCrop(false);
    }
    const readFile = (file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            setImage(e.target.result)
        }
        reader.readAsDataURL(file)
    }
    return (
        <div>
            <div className="profile_img text-center p-4">
                <div className="flex flex-column justify-content-center align-items-center">
                    <img
                        style={{
                            width: "200px",
                            height: "200px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "4px solid green"
                        }}
                        src={profilFinal.length ? profilFinal : image}
                        alt=""
                    />
                    <label htmlFor="" className="mt-3 font-semibold text-5xl">Test</label>

                    <Dialog
                        visible={imageCrop}
                        header={() => (
                            <p htmlFor="" className="text-2xl font-semibold textColor">
                                Update Profile
                            </p>
                        )}
                        onHide={() => setImageCrop(false)}
                    >
                        <div className="confirmation-content flex flex-column align-items-center">
                            <Avatar
                                width={500}
                                height={400}
                                onCrop={onCrop}
                                onClose={onClose}
                                src={src}
                                shadigColor={'#14ce2c'}
                                backgroundColor={'#ffdab9'}

                            />

                            <div className="flex flex-column align-items-center mt-3 w-12">
                                <div className="flex justify-content-around w-12 mt-4">
                                    <Button
                                        onClick={saveCropImage}
                                        label="save"
                                        icon="pi pi-check"

                                    />

                                </div>
                            </div>
                        </div>
                    </Dialog>
                    <InputText
                        type="file" accept="/image/*" style={{ display: 'block' }}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            console.log(file)
                            if (file && file.type.substring(0, 5) === "image") {
                                readFile(file)
                            } else {
                                console.log("Incorrect file type:", file.type)
                                setImage(null)
                            }
                        }}

                    />


                </div>
            </div>
        </div>
    );
};





export default ProfileAvatar;