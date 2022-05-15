import '../../../App.css';
import 'bulma/css/bulma.min.css';
import {useState, useEffect} from "react";
import {getToken} from "../../../utils/tokenUtil";
import MenuItem from "../../MenuItem";

const MenuPage = () => {

    const [menu, setMenu] = useState([])
    const token = getToken()

    //Need to get restaurant id

    //Get the current restaurant ID
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
                //Fetch menu for your own restaurant
                fetch("http://localhost:8000/restaurants/menu/list/"+json.id + "/", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
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
                        // alert("Received blog posts")
                        let menu2 = json.results.sort((a,b) => (a.position) - (b.position))
                        setMenu(menu2)
                        // for (let i=0; i<blogPost.length; i++)
                        // {
                        //     console.log(blogPost[i])
                        // }
                    })
            })
        //alert("hi")
        //
    }, [menu.length])

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

export default MenuPage;