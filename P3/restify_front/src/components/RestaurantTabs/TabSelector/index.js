    import '../../../App.css';
import 'bulma/css/bulma.min.css';
import { Link, Outlet } from 'react-router-dom'
import {getTokenDecoded, getToken} from "../../../utils/tokenUtil";
import {useEffect, useState} from "react";

const TabSelector = (props) => {

    //Check if user is logged in
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(()=>{

        //Check if user is logged in or not
        if (getToken() != null){
            setLoggedIn(true)
        }
        else
        {
            setLoggedIn(false)
        }
    }, [])

    //Is the user logged in?
    if (loggedIn == true)
    {
        //Is the current restaurant owned by you?
        //Check user ID against owner id
        //If you are the owner
        if (getTokenDecoded().user_id === props.owner)
        {
            return <>
                <div className="container p-4">
                    <div className="tabs is-centered">
                        <ul className="tabs-menu">
                            <li data-target="about">
                                <Link to="/myrestaurant/about">
                                    <span>
                                        About
                                    </span>
                                </Link>
                            </li>
                            <li data-target="menu">
                                <Link to="/myrestaurant/menu">
                                    <span>
                                        Menu
                                    </span>
                                </Link>
                            </li>
                            <li data-target="blog">
                                <Link to="/myrestaurant/blog">
                                    <span>
                                        Blog
                                    </span>
                                </Link>
                            </li>
                            <li data-target="comments">
                                <Link to="/myrestaurant/comments">
                                    <span>
                                        Comments
                                    </span>
                                </Link>
                            </li>
                            <li data-target="admin">
                                <Link to="/myrestaurant/admin">
                                    <span>
                                        Admin
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Outlet/>
                </div>
            </>
        }
        else
        {
            //If you are not the owner
            return <>
                <div className="container p-4">
                    <div className="tabs is-centered">
                        <ul className="tabs-menu">
                            <li data-target="about">
                                <Link to={`/restaurants/${props.restId}/about`}>
                                    <span>
                                        About
                                    </span>
                                </Link>
                            </li>
                            <li data-target="menu">
                                <Link to={`/restaurants/${props.restId}/menu`}>
                                    <span>
                                        Menu
                                    </span>
                                </Link>
                            </li>
                            <li data-target="blog">
                                <Link to={`/restaurants/${props.restId}/blog`}>
                                    <span>
                                        Blog
                                    </span>
                                </Link>
                            </li>
                            <li data-target="comments">
                                <Link to={`/restaurants/${props.restId}/comments`}>
                                    <span>
                                        Comments
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Outlet/>
                </div>
            </>
        }
    }
    else
    {
        return <>
            <div className="container p-4">
                <div className="tabs is-centered">
                    <ul className="tabs-menu">
                        <li data-target="about">
                            <Link to={`/restaurants/${props.restId}/about`}>
                                    <span>
                                        About
                                    </span>
                            </Link>
                        </li>
                        <li data-target="menu">
                            <Link to={`/restaurants/${props.restId}/menu`}>
                                    <span>
                                        Menu
                                    </span>
                            </Link>
                        </li>
                        <li data-target="blog">
                            <Link to={`/restaurants/${props.restId}/blog`}>
                                    <span>
                                        Blog
                                    </span>
                            </Link>
                        </li>
                        <li data-target="comments">
                            <Link to={`/restaurants/${props.restId}/comments`}>
                                    <span>
                                        Comments
                                    </span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <Outlet/>
            </div>
        </>
    }

















}

export default TabSelector;