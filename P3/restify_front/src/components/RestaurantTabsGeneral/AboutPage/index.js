import '../../../App.css';
import 'bulma/css/bulma.min.css';
import {Link, Outlet, useParams} from 'react-router-dom'
import Logo from '../../../media/logo.svg'
import Avatar from '../../../media/profile_pic.jpg'
import { useHistory } from "react-router-dom";
import Banner from "../../Banner";
import Navbar from "../../Navbar";
import Sardis from "../../../media/restaurant01.jpg"
import FoodOne from "../../../media/food01.jpg"
import FoodTwo from "../../../media/food02.jpg"
import FoodThree from "../../../media/food03.jpg"
import FoodFour from "../../../media/food04.jpg"
import {getToken} from "../../../utils/tokenUtil";
import {useEffect, useState} from "react";
import $ from "jquery";


const AboutPageGeneral = () => {

    let restId = useParams()
    //Restaurant object
    const [restaurant, setRestaurant] = useState({})

    //const token = getToken()
    let actual = parseInt(restId.restId)
    //console.log("actual is" + actual)

    //Check if user is logged in
    const [loggedIn, setLoggedIn] = useState(false)

    const [numFollows,setNumFollows] = useState(0)
    const [numLikes, setNumLikes] = useState(0)

    //Get the desired restaurant based on ID given by the user
    useEffect(()=>{

        //Check if user is logged in or not
        if (getToken() != null){
            setLoggedIn(true)
        }
        else
        {
            setLoggedIn(false)
        }

        fetch("http://localhost:8000/restaurants/" +actual + "/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                //No authorization needed to see a restaurant...
                //'Authorization': 'Bearer ' + getToken()
            }
        })
            .then(response => response.json())
            .then(json => {
                //Set the constant to the actual restaurant ID
                //json.id is now the restaurant ID. Use it to get the restaurant's about page

                //Need restaurant description, website, email, telephone, and fax
                //json.description, json.website, json.email, json.phone, json.fax

                //Store restaurant object json. restaurant is now the object containing your restaurant
                setRestaurant(json)
                //console.log(restaurant.name)

            })
        //alert("hi")
        //
    }, [numFollows, numLikes])

    const handleFollow = (e) => {
        e.preventDefault()
        //const restaurant_id = 1  //<-- this needs to be changed to determine the restaurants page

        $.ajax({
            url: 'http://localhost:8000/blogs/restaurants/follow/' + restaurant.id,
            method: 'POST',
//            headers: {"Authorization": },  //token
            contentType:"application/json; charset=utf-8",
            headers: {
                Authorization: 'Bearer ' + getToken(),
            },
            // Function to handle success response
            success: function(response) {
                console.log("response: ", response);
//                setFormError("User added");
                //alert("You now follow this restaurant")
                setNumFollows(numFollows+1)
            },
            // Function to handle error response
            error: function(xhr, status, error) {
                if (xhr.status === 400){
                    alert("You already follow this restaurant")
                }
                else if(xhr.status === 401) {
//                    setFormError("You are not authorized to do this");
                    alert("Unauthorized")
                }
                else
                {
//                    setFormError("Server error");
                    alert("Server Error")
                }
            }
        });
    }

    const handleLike = (e) => {
        e.preventDefault()
        //const restaurant_id = 1  //<-- this needs to be changed to determine the restaurants page
        console.log(restaurant.id)

        $.ajax({
            url: 'http://localhost:8000/blogs/restaurants/like/' + restaurant.id,
            method: 'POST',
//            headers: {"Authorization": },  //token
            contentType:"application/json; charset=utf-8",
            headers: {
                Authorization: 'Bearer ' + getToken(),
            },
            // Function to handle success response
            success: function(response) {
                console.log("response: ", response);
//                setFormError("User added");
                //alert("You liked this restaurant")
                setNumLikes(numLikes+1)
            },
            // Function to handle error response
            error: function(xhr, status, error) {
                if (xhr.status === 400){
                    alert("You already like this restaurant")
                }
                else if(xhr.status === 401) {
//                    setFormError("You are not authorized to do this");
                    alert("Unauthorized")
                }
                else
                {
//                    setFormError("Server error");
                    alert("Server Error")
                }
            }
        });
    }

    const handleUnfollow = (e) => {
        e.preventDefault()
        //const restaurant_id = 1  //<-- this needs to be changed to determine the restaurants page

        $.ajax({
            url: 'http://localhost:8000/blogs/restaurants/unfollow/' + restaurant.id,
            method: 'DELETE',
//            headers: {"Authorization": },  //token
            contentType:"application/json; charset=utf-8",
            headers: {
                Authorization: 'Bearer ' + getToken(),
            },
            // Function to handle success response
            success: function(response) {
                console.log("response: ", response);
//                setFormError("User added");
                //alert("Restaurant unfollowed")
                setNumFollows(numFollows-1)
            },
            // Function to handle error response
            error: function(xhr, status, error) {
                if (xhr.status === 400){
                    alert("You already follow this restaurant")
                }
                else if(xhr.status === 401) {
//                    setFormError("You are not authorized to do this");
                    alert("Unauthorized")
                }
                else
                {
//                    setFormError("Server error");
                    alert("Server Error")
                }
            }
        });
    }

    const handleUnlike = (e) => {
        e.preventDefault()
        //const restaurant_id = 1  //<-- this needs to be changed to determine the restaurants page
        console.log(restaurant.id)

        $.ajax({
            url: 'http://localhost:8000/blogs/restaurants/unlike/' + restaurant.id,
            method: 'DELETE',
//            headers: {"Authorization": },  //token
            contentType:"application/json; charset=utf-8",
            headers: {
                Authorization: 'Bearer ' + getToken(),
            },
            // Function to handle success response
            success: function(response) {
                console.log("response: ", response);
//                setFormError("User added");
                //alert("Restaurant unliked")
                setNumLikes(numLikes-1)
            },
            // Function to handle error response
            error: function(xhr, status, error) {
                if (xhr.status === 400){
                    alert("You already like this restaurant")
                }
                else if(xhr.status === 401) {
//                    setFormError("You are not authorized to do this");
                    alert("Unauthorized")
                }
                else
                {
//                    setFormError("Server error");
                    alert("Server Error")
                }
            }
        });
    }

    //Should return something diff if the user is not logged in

    if (loggedIn == false)
    {
        return <>
            <div className="tab-content" id="about">
                <div className="columns">
                    <div className="column is-one-third">
                        <img className="about-image" src={restaurant.primary_image}/>
                        <hr/>
                        <p>Address: {restaurant.address} {restaurant.postal_code}</p>
                        <p>Website:
                            <a href={restaurant.website}>{restaurant.website}</a>
                        </p>
                        <p>Email: <a href={"mailto:" + restaurant.email}>{restaurant.email}</a></p>
                        <p>Telephone: {restaurant.phone}</p>
                        <p>Fax: {restaurant.fax}</p>
                        <p className="mr-2">
                            Likes: {restaurant.number_likes}
                        </p>
                        <p>
                            Followers: {restaurant.number_follows}
                        </p>
                    </div>

                    <div className="column">
                        <h1 className="title">About the Restaurant</h1>
                        <p>
                            {restaurant.description}
                        </p>
                        <br/>
                        <hr/>
                        <h1 className="title">Images</h1>
                        <div className="columns">
                            <div className="column">
                                <img className="py-2" src={FoodOne}/>
                                <img className="py-2" src={FoodTwo}/>
                            </div>
                            <div className="column">
                                <img className="py-2" src={FoodThree}/>
                                <img className="py-2" src={FoodFour}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
    else
    {
        return <>
            <div className="tab-content" id="about">
                <div className="columns">
                    <div className="column is-one-third">
                        <img className="about-image" src={restaurant.primary_image}/>
                        <hr/>
                        <p>Address: {restaurant.address} {restaurant.postal_code}</p>
                        <p>Website:
                            <a href={restaurant.website}>{restaurant.website}</a>
                        </p>
                        <p>Email: <a href={"mailto:" + restaurant.email}>{restaurant.email}</a></p>
                        <p>Telephone: {restaurant.phone}</p>
                        <p>Fax: {restaurant.fax}</p>
                        <div className="buttons">
                            <button className="button is-primary light-red-button mr-2" onClick={handleFollow}>Follow</button>
                            <button className="button is-primary light-red-button mr-2" onClick={handleUnfollow}>Unfollow</button>
                            <button className="button is-primary light-red-button" onClick={handleLike}>Like</button>
                            <button className="button is-primary light-red-button" onClick={handleUnlike}>Unlike</button>
                        </div>
                        <p className="mr-2">
                            Likes: {restaurant.number_likes}
                        </p>
                        <p>
                            Followers: {restaurant.number_follows}
                        </p>
                    </div>

                    <div className="column">
                        <h1 className="title">About the Restaurant</h1>
                        <p>
                            {restaurant.description}
                        </p>
                        <br/>
                        <hr/>
                        <h1 className="title">Images</h1>
                        <div className="columns">
                            <div className="column">
                                <img className="py-2" src={FoodOne}/>
                                <img className="py-2" src={FoodTwo}/>
                            </div>
                            <div className="column">
                                <img className="py-2" src={FoodThree}/>
                                <img className="py-2" src={FoodFour}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }
}

export default AboutPageGeneral;