import '../../App.css';
import 'bulma/css/bulma.min.css';
import { Link } from 'react-router-dom'
import Navbar from "../Navbar";
import Avatar from "../../media/profile_pic.jpg"
import React, { useEffect, useState } from 'react';
import {FaLock} from "react-icons/fa"
import {FaEnvelope} from "react-icons/fa"
import {FaPhone} from "react-icons/fa"
import {getToken, getTokenDecoded} from "../../utils/tokenUtil";
import $ from "jquery"


const EditProfile = () => {

    const [user, setUser] = useState({})

    //Declare relevant constants
//    const [username, setUsername] = useState("")
//    const [firstName, setFirstName ] = useState("")
//    const [lastName, setLastName ] = useState("")
//    const [email, setEmail ] = useState("")
//    const [phone, setPhone] = useState("")
//    const [avatar, setAvatar] = useState(null)
//    const [password, setPassword] = useState("")

    //Use getTokenDecoded to get the user id
    const userId = getTokenDecoded().user_id

    useEffect(()=>{
        fetch("http://localhost:8000/accounts/"+userId+"/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(json => {
//                setUsername(json.username)
//                setFirstName(json.first_name)
//                setLastName(json.last_name)
//                setPhone(json.phone_number)
//                setEmail(json.email)
                setUser(json);
//                fetch(json.avatar, {
//                    method: "GET",
//                    headers: {
//                        'Content-Type': 'application/json',
//                    }
//                }).then(response => response.blob())
//                .then(imageBlob => {
//                    const localImageURL = URL.createObjectURL(imageBlob);
//                    setAvatar(localImageURL)
//                });
            })
    }, [])

    const handleBlur = (event) => {

        // Get the name and value for the field
        let name = event.target.name;
        let value = event.target.value;

        setUser({
            ...user,
            // Trimming any whitespace and update the field changed
            [name]: value.trim()
        });
    };

    const handleImageChange = (event) => {

        // Get the name and value for the field
        let name = event.target.name;
        let value = event.target.files[0];


        setUser({
            ...user,
            [name]: value
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(user);

        // Call sign up API
        if ( user.avatar === null )
        {
            delete user.avatar;
        }

        // Build the formdata to be sent to the server
        let userFormData = new FormData();
        userFormData.append("email", user.email);
        userFormData.append("last_name", user.last_name);
        userFormData.append("first_name", user.first_name);
        userFormData.append("phone_number", user.phone_number);

        if ( (typeof user.avatar) === 'object')
        {
            userFormData.append("avatar", user.avatar, user.avatar.name);
        }


        $.ajax({
            url: 'http://localhost:8000/accounts/',
//            method: 'PATCH',
//            contentType:"application/json; charset=utf-8",
//            data: JSON.stringify(user),
            enctype:"multipart/form-data",
            type: 'PATCH',
            data: userFormData,
            contentType: false,
            processData: false,
            cache: false,
            headers: {
                Authorization: 'Bearer ' + getToken(),
            },
            // Function to handle success response
            success: function(response) {
                console.log("response: ", response);
                alert("Information updated")
                //setFormError("User update");
                //window.location.href = "/login";
            },
            // Function to handle error response
            error: function(xhr, status, error) {
                if ( xhr.status === 400 )
                {
                    //setFormError("Request object error: " + error);
                    console.log("xhr: ", xhr);
                }
                else
                {
                    //setFormError("Server error");
                }
            }
        });
    }



    //Populate user info upon loading of page

    //Update information
    return <>
        <Navbar/>
        <div className="container p-6">
            <div className="columns">
                <div className="column is-one-third">
                    <div className="pic">
                        <figure className="image is-128x128">
                            <img className="is-rounded" src={user.avatar ? (typeof user.avatar === 'string' ? user.avatar : URL.createObjectURL(user.avatar)) : ""} />
                        </figure>
                        <div className="file is-small py-2">
                            <label className="file-label">
                                <input className="file-input" type="file" name="avatar" required defaultValue={user.avatar} accept="image/png, image/jpeg" onChange={handleImageChange}/>
                                <span className="file-cta">
                            <span className="file-icon">
                                <i className="fas fa-upload"></i>
                            </span>
                            <span className="file-label">
                                Choose a file
                            </span>
                        </span>
                            </label>
                        </div>
                    </div>

                    <h1 className="is-size-3 has-text-weight-semibold">{user.username}</h1>
                </div>

                <div className="column">
                    <p className="title">Edit Profile</p>
                    <form onSubmit={handleSubmit}>
                        <div className="columns">
                            <div className="column">
                                <label className="label">First name</label>
                                <div className="control pb-4">
                                    <input type="text" name="first_name" className="input" defaultValue={user.first_name} onBlur={handleBlur} />
                                </div>
                                <label className="label">Email address</label>
                                <div className="control pb-4 has-icons-left">
                                    <input type="email" name="email" className="input" defaultValue={user.email} onBlur={handleBlur} />
                                    <span className="icon is-small is-left">
                                <FaEnvelope/>
                                        {/*<i className="fas fa-envelope"></i>*/}
                            </span>
                                </div>
                                {/*<a href="change-password.html">Change password</a>*/}
                                <Link to="/changepassword" >
                                        <span>
                                            Change password
                                        </span>
                                </Link>
                            </div>
                            <div className="column">
                                <label className="label">Last name</label>
                                <div className="control pb-4">
                                    <input type="text"name="last_name" className="input" defaultValue={user.last_name} onBlur={handleBlur} />
                                </div>
                                <label className="label">Phone number</label>
                                <div className="control has-icons-left">
                                    <input type="tel" name="phone_number" className="input" defaultValue={user.phone_number} onBlur={handleBlur}/>
                                    <span className="icon is-small is-left">
                                {/*<i className="fas fa-phone"></i>*/}
                                        <FaPhone/>
                            </span>
                                </div>
                                <div className="has-text-centered" style={{paddingTop: "1.3rem"}} >
                                    <button  type="submit" className="button is-danger hero-custom is-fullwidth">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default EditProfile;