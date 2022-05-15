import '../../../App.css';
import 'bulma/css/bulma.min.css';
import { Link, Outlet, useParams} from 'react-router-dom'
import Logo from '../../../media/logo.svg'
import Avatar from '../../../media/profile_pic.jpg'
import { useHistory } from "react-router-dom";
import Banner from "../../Banner";
import Navbar from "../../Navbar";
import {useEffect, useState} from "react";
import {getToken} from "../../../utils/tokenUtil";
import MenuItem from "../../MenuItem";


//Populate menu based on existing menu

const MenuPageGeneral = () => {

    //Get the restaurant id
    //Since the endpoint for menu list requires the restaurant id
    let restId = useParams()

    //Actual is the restaurant id
    let actual = parseInt(restId.restId)

    //Restaurant object
    const [menu, setMenu] = useState([])

    //Don't need to check if user is logged in or not

    useEffect(()=>{
        //Populate based on existing menu. Note, need to handle the case where the menu is empty just like
        //with blogs and comments
        fetch("http://localhost:8000/restaurants/menu/list/" +actual + "/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                //No authorization needed to see a restaurant...
                //'Authorization': 'Bearer ' + getToken()
            }
        })
            .then(response => {
                if (response.status === 404)
                {
                    return
                }
                return response.json()
            })
            .then(json => {
                //Set the constant to the actual restaurant ID
                //json.id is now the restaurant ID. Use it to get the restaurant's about page

                //Need restaurant description, website, email, telephone, and fax
                //json.description, json.website, json.email, json.phone, json.fax

                //Store restaurant object json. restaurant is now the object containing your restaurant
                let menu2 = json.results.sort((a,b) => (a.position) - (b.position))
                setMenu(menu2)
                //console.log(restaurant.name)
                //Also, sort the menu
                // let menu2 = menu.sort((a,b) => (b.position) - (a.position))
                // setMenu(menu2)
                // console.log(menu.length)

            })
        //alert("hi")
        //
    }, [menu.length])


    //Render a single entry on the menu
    const renderMenu = menu.map((item, index) =>
        <MenuItem name={item.name} description={item.details} price={item.price}/>
    )

    if (menu.length === 0)
    {
        return <>
            <h1>This restaurant has not added any items to their menu</h1>
        </>
    }
    else {
        return <>
            {renderMenu}
        </>
    }
}

export default MenuPageGeneral;