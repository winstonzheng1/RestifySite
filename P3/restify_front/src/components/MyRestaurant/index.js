import '../../App.css';
import 'bulma/css/bulma.min.css';
import {Link, Outlet} from 'react-router-dom'
import {useEffect, useState} from "react";
import $ from "jquery"
import { getToken, getTokenDecoded, saveToken } from "../../utils/tokenUtil"
import Navbar from "../Navbar";
import Banner from "../Banner";
import AboutPage from "../RestaurantTabs/AboutPage";
import TabSelector from "../RestaurantTabs/TabSelector";

const MyRestaurant = () => {

    //Get the restaurant name
    const [restaurant, setRestaurant] = useState({})
    const token = getToken()

    //Get the current restaurant ID
    useEffect(()=>{
        fetch("http://localhost:8000/restaurants/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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

            })
        //alert("hi")
        //
    }, [])

    return <>
        <Navbar/>
        <Banner name={restaurant.name}/>
        <TabSelector owner={restaurant.owner_id}/>
    </>

}

export default MyRestaurant;
