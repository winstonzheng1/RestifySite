import '../../App.css';
import 'bulma/css/bulma.min.css';
import { Link } from 'react-router-dom'
import $ from "jquery"
import { getToken, getTokenDecoded, saveToken } from "../../utils/tokenUtil"
import Navbar from "../Navbar";
import {FaEnvelope} from "react-icons/fa"
import {FaPhone} from "react-icons/fa"
import {FaFax} from "react-icons/fa"
import {FaGlobe} from "react-icons/fa"
import React, { useEffect, useState } from 'react';


const EditRestaurant = () => {

    //Populate restaurant data

    //Restaurant object
    const [restaurant, setRestaurant] = useState({})

    //Declare relevant constants
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")
    const [theme, setTheme] = useState("")
    const [phone, setPhone] = useState("")
    const [fax, setFax] = useState("")
    const [website, setWebsite] = useState("")
    const [email, setEmail] = useState("")

    //Get userID
    const userId = getTokenDecoded().user_id
    const token = getToken()

    //Populate
    useEffect(()=>{
        //Fix to use restaurant ID instead of user ID
        fetch("http://localhost:8000/restaurants/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(json => {
                setRestaurant(json)
            })
    }, [])


    //Edit (ajax request)
    const handleBlur = (event) => {

        // Get the name and value for the field
        let name = event.target.name;
        let value = event.target.value;

//        validate(name,value);

        setRestaurant({
            ...restaurant,
            // add data for the field to user object
            [name]: value.trim()
        });
    };

    const handleImageChange = (event) => {

        // Get the name and value for the field
        let name = event.target.name;
        let value = event.target.files[0];


        setRestaurant({
            ...restaurant,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(restaurant);
        console.log("test")
        //restaurant.primary_image = document.getElementById("file_input").files[0]
        var formData = new FormData()
        console.log("test2")
        formData.append("name", restaurant.name)
        formData.append("description", restaurant.description)
        formData.append("website", restaurant.website)
        formData.append("email", restaurant.email)
        formData.append("phone", restaurant.phone)
        formData.append("fax", restaurant.fax)
        formData.append("address", restaurant.address)
        formData.append("postal_code", restaurant.postal_code)
        //formData.append("primary_image", restaurant.primary_image)
        console.log("test3")

//        setFormError('');

//        if ( validateUser(user) === false )
//        {
//            console.log('At least one field is invalid.');
//            setFormError('At least one field is invalid');
//            return;
//        }

        if ( (typeof restaurant.primary_image) === 'object')
        {
            formData.append("primary_image", restaurant.primary_image);
        }

        // Call new restaurant API
        $.ajax({
            url: 'http://localhost:8000/restaurants/',
            enctype:"multipart/form-data",
            method: 'PATCH',
//            headers: {"Authorization": },  //token
            //contentType:"application/json; charset=utf-8",
            data: formData,//JSON.stringify(restaurant),
            contentType: false,
            processData: false,
            cache: false,
            headers: {
                Authorization: 'Bearer ' + getToken(),
            },
            // Function to handle success response
            success: function(response) {
                console.log("response: ", response);
//                setFormError("User added");
                window.location.href = "/myrestaurant/about";
            },
            // Function to handle error response
            error: function(xhr, status, error) {

                if ( xhr.status === 400 )
                {
                    //                   setFormError("You cannot create more than one restaurant per account");
                    console.log(xhr)
                    alert("Only 1 restaurant per account")
                }
                else if(xhr.status === 401) {
//                    setFormError("You are not authorized to do this");
                    alert("Unauthorized")
                }
                else
                {
//                    setFormError("Server error");
                    alert("Server error")
                }
            }
        });
    }


















    //Submit button pressed
//     const handleSubmit = (e) => {
//         e.preventDefault()
//         // Call new restaurant API
//         //primary_image, image, banner
//
//         //Patch checks
//         if (restaurant.primary_image === null)
//         {
//             delete restaurant.primary_image
//         }
//
//         if (restaurant.image === null)
//         {
//             delete restaurant.image
//         }
//
//         if (restaurant.banner === null)
//         {
//             delete restaurant.banner
//         }
//
//         $.ajax({
//             url: 'http://localhost:8000/restaurants/',
//             method: 'PATCH',
//             contentType:"application/json; charset=utf-8",
//             data: JSON.stringify(restaurant),
//             headers: {
//                 Authorization: 'Bearer ' + getToken(),
//             },
//             // Function to handle success response
//             success: function(response) {
//                 console.log("response: ", response);
//                 alert("Restaurant info updated")
// //                setFormError("User added");
//                 window.location.href = "/myrestaurant/about";
//             },
//             // Function to handle error response
//             error: function(xhr, status, error) {
//                 if ( xhr.status === 400 )
//                 {
//                     //                   setFormError("You cannot create more than one restaurant per account");
//                     alert("Bad request")
//                 }
//                 else if(xhr.status === 401) {
// //                    setFormError("You are not authorized to do this");
//                     alert("Unauthorized")
//                 }
//                 else
//                 {
// //                    setFormError("Server error");
//                     alert("Server error")
//                 }
//             }
//         });
//     }



    return <>
        <div className="container pt-4">
            <div className="columns is-centered">
                <div className="column is-half">
                    <p className="title has-text-centered has-text-weight-bold">Edit your restaurant</p>
                    <form  onSubmit={handleSubmit} className="pb-6">
                        <div className="field">
                            <label className="label">About</label>
                            <div className="control">
                        <textarea className="textarea" name="description" defaultValue={restaurant.description} onBlur={handleBlur} required ></textarea>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Contacts</label>
                            <div className="control has-icons-left">
                                <input className="input" type="text" name="website" placeholder="Website" defaultValue={restaurant.website} onBlur={handleBlur} required />
                                <span className="icon is-small is-left">
                                    <FaGlobe/>
                                </span>
                            </div>
                            <div className="control has-icons-left">
                                <input className="input" type="text" name="email" placeholder="Email" defaultValue={restaurant.email} onBlur={handleBlur} required />
                                <span className="icon is-small is-left">
                                    <FaEnvelope/>
                                </span>
                            </div>
                            <div className="control has-icons-left">
                                <input className="input" type="text" name="phone" placeholder="Phone" defaultValue={restaurant.phone} onBlur={handleBlur} required />
                                <span className="icon is-small is-left">
                                    <FaPhone/>
                                </span>
                            </div>
                            <div className="control has-icons-left">
                                <input className="input" type="text" name="fax" placeholder="Fax"  defaultValue={restaurant.fax} onBlur={handleBlur} required />
                                <span className="icon is-small is-left">
                                    <FaFax/>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Location</label>
                            <div className="control">
                                <input className="input" type="text" name="address" placeholder="Location" defaultValue={restaurant.address} onBlur={handleBlur} required/>
                            </div>
                        </div>
                        <figure className="image is-128x128">
                            <img className="is-rounded" src={restaurant.primary_image ? (typeof restaurant.primary_image === 'string' ? restaurant.primary_image : URL.createObjectURL(restaurant.primary_image)) : ""} />
                        </figure>
                        <div className="field">
                            <label className="label">Upload images</label>
                            <div className="file is-normal">
                                <label className="file-label">
                                    <input className="file-input" type="file" name="primary_image" required defaultValue={restaurant.primary_image} accept="image/png, image/jpeg" onChange={handleImageChange}/>
                            <span className="file-cta">
                            <span className="file-icon">
                                <i className="fas fa-upload"></i>
                            </span>
                            <span className="file-label">
                                Choose files
                            </span>
                        </span>
                                </label>
                            </div>
                            <br/>
                                <div className="has-text-centered">
                                    <button className="button is-info hero-custom">Submit</button>
                                </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>

}

export default EditRestaurant;






































