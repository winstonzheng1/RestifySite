import '../../App.css';
import 'bulma/css/bulma.min.css';
import { Link } from 'react-router-dom'
import {useEffect, useState} from "react";
import $ from "jquery"
import { getToken, getTokenDecoded, saveToken } from "../../utils/tokenUtil"
import Navbar from "../Navbar";

const EditMenu = () => {

    const priceregex = new RegExp(/^[0-9]{1,3}\.[0-9]{1,2}$/)
    //Restaurant object
    const [menu, setMenu] = useState({});
    const [restaurantId, setRestaurantId] = useState(0)
    const [menuItems, setMenuItems] = useState([]);

    const userId = getTokenDecoded().user_id
    const token = getToken()

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
                //Set the constant to the actual restaurant ID
               setRestaurantId(json.id)
            })
    }, [])

    if (restaurantId > 0) {
        fetch("http://localhost:8000/restaurants/menu/list/" + restaurantId + "/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(json => {
                //Set the constant to the actual restaurant ID
               setMenuItems(json.results)
            })
        setRestaurantId(0)
    }
    

    const handleBlur = (event) => {

        // Get the name and value for the field
        let name = event.target.name;
        let value = event.target.value;

//        validate(name,value);

        setMenu({
            ...menu,
            // add data for the field to user object
            [name]: value.trim()
        });
    };

    const handlePatch = (e) => {
        e.preventDefault()
        console.log(menu);

        if (!priceregex.test(menu['price'])) {
            console.log(priceregex.test(menu['price']))
            //alert("Price must be no greater than 999.99 and can have no more then 2 decimal placess")
        }
       

        // Call new restaurant API
        $.ajax({
            url: 'http://localhost:8000/restaurants/menu/' + menu.ID + "/",
            method: 'PATCH',
//            headers: {"Authorization": },  //token
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(menu),
            headers: {
                Authorization: 'Bearer ' + getToken(),
            },
            // Function to handle success response
            success: function(response) {
                console.log("response: ", response);
//                setFormError("User added");
                alert("Item edited")
                window.location.href = "/myrestaurant/editmenu";
            },
            // Function to handle error response
            error: function(xhr, status, error) {
                if ( xhr.status === 400 )
                {
 //                   setFormError("You cannot create more than one restaurant per account");
                    alert("Incorrect formatting")
                }
                else if(xhr.status === 401) {
//                    setFormError("You are not authorized to do this");
                    alert("Unauthorized")
                }
                else
                {
//                    setFormError("Server error");
                    //alert("You don't have a restaurant")
                }
            }
        });
    }

    const handleDelete = (e) => {
        e.preventDefault()
        console.log(menu);

        // Call new restaurant API
        $.ajax({
            url: 'http://localhost:8000/restaurants/menu/' + menu.ID + "/",
            method: 'DELETE',
//            headers: {"Authorization": },  //token
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(menu),
            headers: {
                Authorization: 'Bearer ' + getToken(),
            },
            // Function to handle success response
            success: function(response) {
                console.log("response: ", response);
//                setFormError("User added");
                window.location.href = "/myrestaurant";
            },
            // Function to handle error response
            error: function(xhr, status, error) {
                if ( xhr.status === 400 )
                {
 //                   setFormError("You cannot create more than one restaurant per account");
                    alert("Incorrect formatting")
                }
                else if(xhr.status === 401) {
//                    setFormError("You are not authorized to do this");
                    alert("Unauthorized")
                }
                else
                {
//                    setFormError("Server error");
                    alert("You don't have a restaurant")
                }
            }
        });
    }

  


  return <>
      <div className="container pt-4">
        <div className="columns is-centered">
            <div className="column is-half">
                <p className="title has-text-centered has-text-weight-bold">Edit your menu</p>

            </div>
        </div>
    
    <div className="container p-4">
        <div className="columns is-centered">
                <div className="column is-four-fifths">
                    <form className="pb-6">
                        <div className="control">
                            <input className="input" type="text" name="ID" placeholder="Menu item ID" required onBlur={handleBlur}/>
                        </div>
                        <div className="control">
                            <input className="input" type="text" name="name" placeholder="Name of menu item" required onBlur={handleBlur}/>
                        </div>
                        <div className="control">
                            <textarea className="input" type="text" name="details" placeholder="Details about item" required onBlur={handleBlur}/>
                        </div>
                        <div className="control">
                            <input className="input" style={{width:"75%"}} type="text" name="price" placeholder="Price" required onBlur={handleBlur}/>
                            <input className="input" style={{width:"25%"}} type="text" name="position" placeholder="Position on Menu" required onBlur={handleBlur}/>
                        </div>
                        <div className="control">
                            <button className="button is-success" onClick={handlePatch}>Edit this menu item</button>
                            <button className="button is-danger" onClick={handleDelete}>Delete this menu item</button>
                        </div>
                    </form>
                    <p className="title has-text-centered has-text-weight-bold">Your Menu</p>
                    <pre style={{height:"100%"}}>{JSON.stringify(menuItems, null, 2)}</pre>
                </div>
        </div>
    </div>
</div>
  </>

}

export default EditMenu;
