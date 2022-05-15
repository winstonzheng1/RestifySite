import '../../App.css';
import 'bulma/css/bulma.min.css';
import { Link } from 'react-router-dom'
import {useEffect, useState} from "react";
import $ from "jquery"
import {FaUser} from "react-icons/fa"
import {FaLock} from "react-icons/fa"
import {FaEnvelope} from "react-icons/fa";
import {FaPhone} from "react-icons/fa";
import Logo from "../../media/logo.svg"

const Signup = () => {

    // const [teset, testdata] = useState([])
    //
    // const formData = new FormData();
    //
    // /*
    // body: b'------WebKitFormBoundaryHUfYR4B18xj4kgMj\r\nContent-Disposition: form-data; name="username"\r\n\r\ntest_username1234\r\n------WebKitFormBoundaryHUfYR4B18xj4kgMj\r\nContent-Disposition: form-data; name="password"\r\n\r\ntest_password\r\n------WebKitFormBoundaryHUfYR4B18xj4kgMj\r\nContent-Disposition: form-data; name="first_name"\r\n\r\ntest_first\r\n------WebKitFormBoundaryHUfYR4B18xj4kgMj\r\nContent-Disposition: form-data; name="last_name"\r\n\r\ntest_last\r\n------WebKitFormBoundaryHUfYR4B18xj4kgMj\r\nContent-Disposition: form-data; name="email"\r\n\r\ntest@mail.com\r\n------WebKitFormBoundaryHUfYR4B18xj4kgMj\r\nContent-Disposition: form-data; name="phone_number"\r\n\r\n519-551-7753\r\n------WebKitFormBoundaryHUfYR4B18xj4kgMj--\r\n'
    // body: b'----------------------------856565834566036536269774\r\nContent-Disposition: form-data; name="username"\r\n\r\nbarples1234\r\n----------------------------856565834566036536269774\r\nContent-Disposition: form-data; name="password"\r\n\r\npassword\r\n----------------------------856565834566036536269774\r\nContent-Disposition: form-data; name="first_name"\r\n\r\nfirstname\r\n----------------------------856565834566036536269774\r\nContent-Disposition: form-data; name="last_name"\r\n\r\nlastname\r\n----------------------------856565834566036536269774\r\nContent-Disposition: form-data; name="email"\r\n\r\nmail@mail.com\r\n----------------------------856565834566036536269774\r\nContent-Disposition: form-data; name="phone_number"\r\n\r\n519-551-7753\r\n----------------------------856565834566036536269774--\r\n'    */
    //
    // formData.append("username", "test_username1234")
    // formData.append("password", "test_password")
    // formData.append("first_name", "test_first")
    // formData.append("last_name", "test_last")
    // formData.append("email", "test@mail.com")
    // formData.append("phone_number", "519-551-7753")
    // formData.append("avatar", null)
    //
    // const requestData = {
    //     method: "POST",
    //     body: formData
    // };
    //
    // fetch('http://localhost:8000/accounts/', requestData).then(res => console.log(res))


    // User data
    const [user, setUser] = useState({});
    const [formError, setFormError] = useState('');

    const phoneregex = new RegExp(/^\d{3}-\d{3}-\d{4}$/);
    var phoneverr = true;

    const errorStyle = {
        fontSize: 24,
        fondWeight: "bold",
        color: "red",
        textAlign: "center",
    }

    const handleBlur = (event) => {

        // Get the name and value for the field
        let name = event.target.name;
        let value = event.target.value;

//        validate(name,value);

        setUser({
            ...user,
            // add data for the field to user object
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

        setFormError('');
        phoneverr = true

        console.log(user)

        phoneverr = phoneregex.test(user['phone_number'])


        // Call sign up API
        if ( user.avatar === null )
        {
            delete user.avatar;
        }

        // Build the formdata to be sent to the server
        let userFormData = new FormData();
        userFormData.append("username", user.username);
        userFormData.append("password", user.password);
        userFormData.append("email", user.email);
        userFormData.append("last_name", user.last_name);
        userFormData.append("first_name", user.first_name);
        userFormData.append("phone_number", user.phone_number);

        if ( (typeof user.avatar) === 'object')
        {
            userFormData.append("avatar", user.avatar, user.avatar.name);
        }


        // Call sign up API
        $.ajax({
            url: 'http://localhost:8000/accounts/',
//            method: 'POST',
//            contentType:"application/json; charset=utf-8",
//            data: JSON.stringify(user),
            enctype:"multipart/form-data",
            type: 'POST',
            data: userFormData,
            contentType: false,
            processData: false,
            cache: false,
            // Function to handle success response
            success: function(response) {
                console.log("response: ", response);
                setFormError("User added");
                window.location.href = "/login";
            },
            // Function to handle error response
            error: function(xhr, status, error) {
                if ( xhr.status === 400 && phoneverr)
                {
                    setFormError("A user with that username already exists.");
                }
                else if(!phoneverr) {
                    setFormError('Phone number needs to be in format like: 123-123-1234')
                }
                else
                {
                    setFormError("Server error");
                }

            }
        });
    }

    return <>
        <div>
            <div className="container">
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <Link className="navbar-item logo py-0" to="/Home">
                            <img src={Logo} width="50" height="50"/>
                        </Link>
                        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
                           data-target="restifyNavbar">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <div id="restifyNavbar" className="navbar-menu">
                        <div className="navbar-start">

                            <Link to="/home" className="navbar-item">
                                Search
                            </Link>

                            {/*<a className="navbar-item" href="index.html">*/}
                            {/*    Search*/}
                            {/*</a>*/}
                        </div>
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">

                                    <Link to="/signup" className="button is-primary light-red-button">
                                        <strong>Signup</strong>
                                    </Link>
                                    {/*<a href="signup.html" className="button is-primary light-red-button">*/}
                                    {/*    <strong>Signup</strong>*/}
                                    {/*</a>*/}

                                    <Link to="/login" className="button is-light">
                                        Login
                                    </Link>

                                    {/*<a href="login.html" className="button is-light">*/}
                                    {/*    Login*/}
                                    {/*</a>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="container pt-6">
                <div className="columns is-centered">
                    <div className="column is-one-third">
                        {formError && (<p className="error" style={errorStyle}> {formError} </p>)}
                        <form className="mb-6 box" onSubmit={handleSubmit}>
                            <p className="title has-text-centered has-text-weight-bold">Create a Restify account</p>
                            <div className="field">
                                <label className="label">First name</label>
                                <div className="control">
                                    <input className="input" type="text" name="first_name" placeholder="First name" required onBlur={handleBlur}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Last name</label>
                                <div className="control">
                                    <input className="input " type="text" name="last_name" placeholder="Last name" required onBlur={handleBlur}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Username</label>
                                <div className="control has-icons-left">
                                    <input className="input" type="text" name="username" placeholder="Username" required onBlur={handleBlur}/>
                                    <span className="icon is-small is-left">
                                          <FaUser/>
                                        {/*<i className="fas fa-user"></i>*/}
                        </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Email address</label>
                                <div className="control has-icons-left">
                                    <input className="input" type="email" name="email" placeholder="example@restify.com" required onBlur={handleBlur}/>
                                    <span className="icon is-small is-left">
                                          <FaEnvelope/>
                                        {/*<i className="fas fa-envelope"></i>*/}
                        </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Phone number</label>
                                <div className="control has-icons-left">
                                    <input className="input" type="tel" name="phone_number" placeholder="123-456-7890" required onBlur={handleBlur}/>
                                    <span className="icon is-small is-left">
                                          <FaPhone/>
                                        {/*<i className="fas fa-phone"></i>*/}
                        </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control has-icons-left">
                                    <input className="input" type="password" name="password" placeholder="Password" minLength="8" required onBlur={handleBlur}/>
                                    <span className="icon is-small is-left">
                                          <FaLock/>
                                        {/*<i className="fas fa-lock"></i>*/}
                        </span>
                                </div>
                                <p className="help">Minimum of 8 characters</p>
                            </div>
                            <label className="label">Avatar</label>
                            <img className='preview-image' src={user.avatar ? (typeof user.avatar === 'string' ? user.avatar : URL.createObjectURL(user.avatar)) : ""} width="50" height="50"  alt="No Avatar" />
                            <div className="file is-normal">
                                <label className="file-label">
                                    <input className="file-input" type="file" name="avatar" defaultValue={user.avatar} accept="image/png, image/jpeg" onChange={handleImageChange}/>
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
                            <br/>
                            <div className="field has-text-centered">
                                <div className="control">
                                    <label className="checkbox">
                                        <input type="checkbox" required/>
                                        I agree to <a href="">Restify's terms & conditions</a>
                                    </label>
                                </div>
                            </div>
                            <div className="has-text-centered">
                                <button className="button is-danger hero-custom">Sign up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Signup;