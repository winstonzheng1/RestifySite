import '../../App.css';
import 'bulma/css/bulma.min.css';
import { Link, Outlet } from 'react-router-dom'
import Logo from '../../media/logo.svg'
import Avatar from '../../media/profile_pic.jpg'
import {removeToken} from "../../utils/tokenUtil";
import { useHistory } from "react-router-dom";
import {FaBell} from "react-icons/fa"
import {FaCircle} from "react-icons/fa"
import {FaUser} from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import $ from "jquery"
import { getToken, getTokenDecoded, saveToken } from "../../utils/tokenUtil"

const LogOut = () => {
    removeToken();
    //window.location.href = "/home";
}

const Navbar = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [hasRestaurant, setHasRestaurant] = useState(false)
    const [notifications, setNotifications] = useState([])

    useEffect(()=>{
        if (getToken() != null){
            //User is logged in and can receive notifications, so save their id and their token for later
            setLoggedIn(true)
            const userId = getTokenDecoded().user_id;
            const token = getToken()
            //Check if a restaurant has been made for the logged in user
            $.ajax({
                url: `http://localhost:8000/restaurants/`,
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + getToken(),
                },
                // Function to handle success response
                success: function(response) {
                    //Success, so set hasRestaurant to true
                    setHasRestaurant(true)
                    //console.log("response: ", response);
                    // window.location.href = "/login";

                },
                // Function to handle error response
                error: function(xhr, status, error) {
                    if ( xhr.status === 400 )
                    {
                        //setFormError("A user with that username already exists.");
                        alert("Bad request")
                    }
                    else if (xhr.status === 404)
                    {
                        //No restaurant, set hasRestaurant to false
                        setHasRestaurant(false)
                    }
                    else
                    {
                        //alert("Server error")
                        //setFormError("Server error");
                    }
                }
            });

            //Make a request to the notifications api
            //Note: notifications are accessed for a user using the user id
            //const userId above can be used for that
            //And token is the token
            fetch("http://localhost:8000/blogs/notifications/" + userId, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
                //Check if the response was 404
                .then(response => {
                    //Check for the 0 notification case lol
                    if (response.status === 404)
                    {
                        return
                    }
                    return response.json()
                })
                .then(json => {
                    //Set the notifications array
                    setNotifications(json.results)
                    // for (let i=0; i < notifications.length; i++)
                    // {
                    //     console.log(notifications[i])
                    // }
                })
        }
        else //No need for notifications, not logged in
        { setLoggedIn(false) }
    }, [])

    //Create the component for notifications

    const NotificationItem = (props) => {
        return <>
            <a href="" className="navbar-item">
                    <span className="unread-spacer"></span>
                    {props.description}
            </a>
        </>
    }

    //Create a bunch of notification items
    const renderNotifications = notifications.map((notification, index) =>
        <NotificationItem description={notification.description}/>
    )

    if (loggedIn === true && hasRestaurant=== true)
    {
        return <>
            <div>
                <div className="container">
                    <nav className="navbar" role="navigation" aria-label="main navigation">
                        <div className="navbar-brand">
                            <Link to="/home" className="navbar-item logo py-0">
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
                                    <span>
                                        Search
                                    </span>
                                </Link>
                                <Link to="/feed" className="navbar-item">
                                    <span>
                                        Feed
                                    </span>
                                </Link>
                                <Link to="/myrestaurant/about" className="navbar-item">
                                    <span>
                                        My Restaurant
                                    </span>
                                </Link>
                            </div>

                            <div className="navbar-end">
                                <div className="navbar-item has-dropdown is-hoverable">
                                    <a className="navbar-link is-arrowless">
                                        <div className="icon-with-badge">
                                            <span className="badge is-danger">1</span>
                                            {/*<i className="far fa-bell navy-blue icon-x-large"></i>*/}
                                            <FaBell/>
                                        </div>
                                    </a>
                                    <div className="navbar-dropdown is-boxed is-right">
                                        <a href="" className="navbar-item">
                                      <span className="unread-spacer">
                                          {/*<i className="fas fa-circle unread"></i>*/}
                                          {/*<FaCircle/>*/}
                                      </span>
                                            Let's get started!
                                        </a>
                                        <a href="" className="navbar-item">
                                            <span className="unread-spacer"></span>
                                            Welcome to Restify!
                                        </a>
                                        {renderNotifications}
                                    </div>
                                </div>
                                <div className="navbar-item has-dropdown is-hoverable">
                                    <a className="navbar-link is-arrowless">
                                        <figure className="image p-0">
                                            {/*<img className="is-rounded" src={Avatar}/>*/}
                                            <FaUser/>
                                        </figure>
                                    </a>
                                    <div className="navbar-dropdown is-boxed is-right">
                                        <Link to="/editprofile" className="navbar-item">
                                        <span>
                                            Edit Profile
                                        </span>
                                        </Link>
                                        <Link to="/myrestaurant/editrestaurant" className="navbar-item">
                                        <span>
                                            Edit Restaurant
                                        </span>
                                        </Link>
                                        <hr className="navbar-divider"/>
                                        <Link to="/login" className="navbar-item" onClick={LogOut} >
                                        <span>
                                            Logout
                                        </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    }

    if (loggedIn === true && hasRestaurant===false)
    {
        return <>
            <div>
                <div className="container">
                    <nav className="navbar" role="navigation" aria-label="main navigation">
                        <div className="navbar-brand">
                            <Link to="/home" className="navbar-item logo py-0">
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
                                    <span>
                                        Search
                                    </span>
                                </Link>
                                <Link to="/feed" className="navbar-item">
                                    <span>
                                        Feed
                                    </span>
                                </Link>
                            </div>

                            <div className="navbar-end">
                                <div className="navbar-item has-dropdown is-hoverable">
                                    <a className="navbar-link is-arrowless">
                                        <div className="icon-with-badge">
                                            <span className="badge is-danger">1</span>
                                            {/*<i className="far fa-bell navy-blue icon-x-large"></i>*/}
                                            <FaBell/>
                                        </div>
                                    </a>
                                    <div className="navbar-dropdown is-boxed is-right">
                                        <a href="" className="navbar-item">
                                      <span className="unread-spacer">
                                          {/*<i className="fas fa-circle unread"></i>*/}
                                          {/*<FaCircle/>*/}
                                      </span>
                                            Let's get started!
                                        </a>
                                        <a href="" className="navbar-item">
                                            <span className="unread-spacer"></span>
                                            Welcome to Restify!
                                        </a>
                                        {/*{notifications}*/}

                                    </div>
                                </div>
                                <div className="navbar-item has-dropdown is-hoverable">
                                    <a className="navbar-link is-arrowless">
                                        <figure className="image p-0">
                                            <FaUser/>
                                        </figure>
                                    </a>
                                    <div className="navbar-dropdown is-boxed is-right">
                                        <Link to="/editprofile" className="navbar-item">
                                        <span>
                                            Edit Profile
                                        </span>
                                        </Link>
                                        <Link to="/newrestaurant" className="navbar-item">
                                        <span>
                                            Add Restaurant
                                        </span>
                                        </Link>
                                        <hr className="navbar-divider"/>
                                        <Link to="/login" className="navbar-item" onClick={LogOut} >
                                        <span>
                                            Logout
                                        </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    }

    if (loggedIn === false){
        return<>
            <div>
                <div className="container">
                    <nav className="navbar" role="navigation" aria-label="main navigation">
                        <div className="navbar-brand">
                            <Link to="/home" className="navbar-item logo py-0">
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
                                    <span>
                                        Search
                                    </span>
                                </Link>
                            </div>

                            <div className="navbar-end">
                                <div className="buttons">
                                    <Link to="/signup" className="button is-primary light-red-button">
                                        <strong>Signup</strong>
                                    </Link>
                                    <Link to="/login" className="button is-light">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    }
  }
  
  export default Navbar;