import '../../App.css';
import 'bulma/css/bulma.min.css';
import { Link } from 'react-router-dom'
import {useEffect, useState} from "react";
import $ from "jquery"
import { getToken, getTokenDecoded, saveToken } from "../../utils/tokenUtil"
import {FaUser} from "react-icons/fa"
import {FaLock} from "react-icons/fa"

const Login = () => {

    const [user, setUser] = useState({username: '', password: ''});
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formError, setFormError] = useState('');

    const handleBlur = (e) => {
        setUser({
            ...user,
            // Trimming any whitespace and update the field changed
            [e.target.name]: e.target.value.trim()
        });
    };

    const validate = (name, value) => {
        //A function to validate each input values

        switch (name) {
            case 'username':
                if ( value )
                {
                }
                // username not entered
                else
                {
                    setUsernameError('Username is required');
                    return false;
                }

                setUsernameError('');
                return true;

            case 'password':
                if ( value )
                {
                }
                else
                {
                    setPasswordError('Password is required');
                    return false;
                }

                setPasswordError('');
                return true;

            default:
                return true;
        }
    }

    const validateUser = (user) => {
        let isValid = true;

        if ( validate('username', user.username) === false )
        {
            isValid = false;
        }

        if ( validate('password', user.password) === false )
        {
            isValid = false;
        }

        return isValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("user:", user);

        setFormError('');

        if ( validateUser(user) === false )
        {
            console.log('At least one field is invalid.');
            return;
        }

        // Call Login API
        $.ajax({
            url: 'http://localhost:8000/accounts/token/',
            method: 'POST',
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(user),
            // Function to handle success response
            success: function(response) {
                //console.log("response: ", response);
                const accessToken = response.access;
                const refreshToken = response.refresh;
                console.log("accessToken: ", accessToken);
                console.log("refreshToken: ", refreshToken);
                setFormError("Login successfully");
                saveToken(accessToken);

                console.log("token: ", getToken() );
                console.log("tokenDecoded: ", getTokenDecoded() );

                window.location.href = "/home";
            },
            // Function to handle error response
            error: function(xhr) {
                if ( xhr.status === 401 )
                {
                    setFormError("Invalid Username or password");
                }
                else
                {
                    setFormError("Unknown server error occurred");
                }
            }
        });
    };









    return <>
        <div className="container pt-6">
            <div className="columns is-centered">
                <div className="column is-one-third">
                    <form className="mb-6 box"  onSubmit={handleSubmit}>
                        <p className="title has-text-centered has-text-weight-bold">Login to your Restify account</p>

                        <div className="field mb-4">
                            <label className="label">Username or Email</label>
                            <div className="control has-icons-left">
                                <input className="input" name="username" type="text" placeholder="Username or Email" required onBlur={handleBlur}/>
                                <span className="icon is-small is-left">
                                    {/*<i className="fas fa-user"></i>*/}
                                    <FaUser/>
                                </span>
                            </div>
                        </div>
                        <p>{usernameError}</p>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control has-icons-left">
                                <input className="input" name="password" type="password" placeholder="Password" required onBlur={handleBlur}/>
                        <span className="icon is-small is-left">
                            {/*<i className="fas fa-lock"></i>*/}
                            <FaLock/>
                        </span>
                            </div>
                        </div>
                        <p>{passwordError}</p>

                        <a href="">Forgot your password?</a>
                        <div className="has-text-centered mt-4">
                            <button className="button is-danger hero-custom is-fullwidth">Sign in</button>
                        </div>
                        <p>{formError}</p>
                    </form>
                </div>
            </div>
        </div>
    </>
}



export default Login;




















