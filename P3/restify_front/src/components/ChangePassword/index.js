import '../../App.css';
import 'bulma/css/bulma.min.css';
import { Link } from 'react-router-dom'
import {useEffect, useState} from "react";
import $ from "jquery"
import { getToken, getTokenDecoded, saveToken } from "../../utils/tokenUtil"
import {FaLock} from "react-icons/fa"
import {FaUser} from "react-icons/fa"
import Navbar from "../Navbar";


const ChangePassword = () => {

    // User data
    const [user, setUser] = useState({});

    const userId = getTokenDecoded().user_id;


    // Everytime the query is changed, new request will be sent.
    // Make sure search and page are changed at the same time
    useEffect(() => {
        $.ajax({
            url: `http://localhost:8000/accounts/${userId}/`,
        method: 'GET',
            // Function to handle success response
            success: function(response) {
                console.log("Hello")
            console.log("response is: ", response);
            //setFormError("User retrieved");
            setUser(response);
            // window.location.href = "/login";
        },
        // Function to handle error response
        error: function(xhr, status, error) {
            if ( xhr.status === 400 )
            {
                //setFormError("A user with that username already exists.");
            }
            else
            {
                //setFormError("Server error");
            }
        }
    });
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

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(user);

        // Call Login API
        // Get token to see whether the original_password is entered correctly
        $.ajax({
            url: 'http://localhost:8000/accounts/token/',
            method: 'POST',
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify({
                username: user.username,
                password: user.original_password
            }),
            // Function to handle success response
            success: function(response) {
                // Update the account with the new password
                $.ajax({
                    url: 'http://localhost:8000/accounts/',
                method: 'PATCH',
                    contentType:"application/json; charset=utf-8",
                    data: JSON.stringify({
                    id: user.id,
                    password: user.password
                }),
                    headers: {
                    Authorization: 'Bearer ' + getToken(),
                },
                // Function to handle success response
                success: function(response) {
                    console.log("response: ", response);
                    //setFormError("Password update");
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
            },
            // Function to handle error response
            error: function(xhr) {
                if ( xhr.status === 401 )
                {
                    //setFormError("Invalid original password");
                }
                else
                {
                    //setFormError("Unknown error occurred");
                }
            }
        });
    }

    return <>
        <Navbar/>
        <div className="container pt-6">
            <div className="columns is-centered">
                <div className="column is-one-third">
                    <form onSubmit={handleSubmit}className="mb-6 box">
                        <p className="title has-text-centered has-text-weight-bold">Change password</p>
                        <div className="field">
                            <label className="label">Current password</label>
                            <div className="control has-icons-left">
                                <input className="input" type="password" name="original_password" onBlur={handleBlur} required/>
                        <span className="icon is-small is-left">
                            {/*<i className="fas fa-lock"></i>*/}
                            <FaLock/>
                        </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">New password</label>
                            <div className="control has-icons-left">
                                <input className="input " type="password" name="password" minLength="8" onBlur={handleBlur} required/>
                        <span className="icon is-small is-left">
                            {/*<i className="fas fa-lock"></i>*/}
                            <FaLock/>
                        </span>
                            </div>
                            <p className="help">Minimum of 8 characters</p>
                        </div>

                        <div className="has-text-centered mt-4">
                            <button type="submit" className="button is-danger hero-custom is-fullwidth">Change password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}



export default ChangePassword;




















