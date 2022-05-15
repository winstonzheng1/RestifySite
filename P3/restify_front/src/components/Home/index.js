import '../../App.css';
import 'bulma/css/bulma.min.css';
import { Link, Outlet} from 'react-router-dom'
import Navbar from '../Navbar'
import {useEffect, useState} from "react";
import { getToken, getTokenDecoded, saveToken } from "../../utils/tokenUtil"
import axios from 'axios';

const Home = () => {

    const [query, setQuery] = useState('')
    //List of restaurant entries from search queries
    const [restaurants, setRestaurants] = useState([])

    //const [restId, setRestId] = useState(0)
    let id = 0

    //Check if user is logged in
    const [loggedIn, setLoggedIn] = useState(false)

    //When query changes, useEffect runs again
    useEffect(()=>{
        if (getToken() != null){
            setLoggedIn(true)
        }
        else
        { setLoggedIn(false) }
        // //Clear existing restaurants array as it must be refilled
        // for (let k = 0; k < length; k++) {
        //
        // }
        setRestaurants([])


        fetch("http://localhost:8000/restaurants/search/?name=" + query, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(json => {
                //Do something with the returned json
                //Append the food results to the restaurants array
                setRestaurants(json.results)
            })
    }, [query])


    //Populating the restaurants array when queried
//     const handleQuery = (event) => {
//         for (let k = 0; k < restaurants.length; k++) {
//             setRestaurants(restaurants.pop())
//         }
//
//         //Clear the restaurants array (pop every element). So clear the old search results
//
//         //Now, populate the restaurants array with the new search results
//
//         //Whatever the user put in the box is stored in query
//         const query = event.target.value
//
//         //Then, search by food, address, and name, and populate the restaurants array with all results
//
//
//         //Search by name
//         fetch("http://localhost:8000/restaurants/search/?name=" + query, {
//             method: "GET",
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         })
//             .then(response => response.json())
//             .then(json => {
//                 //Do something with the returned json
//                 //Append the food results to the restaurants array
//                 setRestaurants(restaurants.concat(json.results))
//             })
//
//         console.log("Length of restaurants array is: " + restaurants.length)
//         for (let i = 0; i < restaurants.length; i++)
//         {
//             console.log(restaurants[i])
//         }
//
//
//         // //Search by food
//         // fetch("http://localhost:8000/restaurants/search/?food=" + query, {
//         //     method: "GET",
//         //     headers: {
//         //         'Content-Type': 'application/json',
//         //     }
//         // })
//         //     .then(response => response.json())
//         //     .then(json => {
//         //         //Do something with the returned json
//         //         //Append the food results to the restaurants array
//         //         setRestaurants(restaurants.concat(json.results))
//         //     })
//         //
//         // //Search by address
//         // fetch("http://localhost:8000/restaurants/search/?address=" + query, {
//         //     method: "GET",
//         //     headers: {
//         //         'Content-Type': 'application/json',
//         //     }
//         // })
//         //     .then(response => response.json())
//         //     .then(json => {
//         //         //Do something with the returned json
//         //         //Append the food results to the restaurants array
//         //         setRestaurants(restaurants.concat(json.results))
//         //     })
//
//
//
//         //Search by food
// //         fetch("http://localhost:8000/restaurants/search/?food=" + query, {
// //             method: "GET",
// //             headers: {
// //                 'Content-Type': 'application/json',
// //                 // 'Authorization': 'Bearer ' + getToken()
// //             }
// //         })
// //             .then(response => response.json())
// //             .then(json => {
// //                 id = json.results[0].id
// //                 //setRestId(json.results[0].id)
// //                 //console.log("Rest id is" + id)
// //                 //Get the image for each restaurant found from the food search
// //                 for (let i = 0; i < json.results.length; i++) {
// //                     fetch(json.results[i].primary_image, {
// //                         method: "GET",
// //                         headers: {
// //                             'Content-Type': 'application/json',
// //                         }
// //                     }).then(response => response.blob())
// //                     .then(imageBlob => {
// //                         const localImageURL = URL.createObjectURL(imageBlob);
// //                         setRestaurants(restaurants.concat(<Input
// //                             key={restaurants.length}
// //                             results={json.results[i]}
// //                             image={localImageURL}
// //                             />))
// //                     })
// //                 }
// //
// //             })
// // ////////////////////////////////////////////////////////////////////////////////////////
// //             fetch("http://localhost:8000/restaurants/search/?address=" + query, {
// //             method: "GET",
// //             headers: {
// //                 'Content-Type': 'application/json',
// //                 // 'Authorization': 'Bearer ' + getToken()
// //             }
// //         })
// //             .then(response => response.json())
// //             .then(json => {
// //                 id = json.results[0].id
// //                 //setRestId(json.results[0].id)
// //                 console.log("Rest id is" + id)
// //                 for (let i = 0; i < json.results.length; i++) {
// //                     fetch(json.results[i].primary_image, {
// //                         method: "GET",
// //                         headers: {
// //                             'Content-Type': 'application/json',
// //                         }
// //                     }).then(response => response.blob())
// //                     .then(imageBlob => {
// //                         const localImageURL = URL.createObjectURL(imageBlob);
// //                         setRestaurants(restaurants.concat(<Input
// //                             key={restaurants.length}
// //                             results={json.results[i]}
// //                             image={localImageURL}
// //                             />))
// //                     })
// //                 }
// //
// //             })
// //
// // ////////////////////////////////////////////////////////////////////////////////////////////
// //             fetch("http://localhost:8000/restaurants/search/?name=" + query, {
// //                 method: "GET",
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                     // 'Authorization': 'Bearer ' + getToken()
// //                 }
// //             })
// //                 .then(response => response.json())
// //                 .then(json => {
// //                     id = json.results[0].id
// //                     //setRestId(json.results[0].id)
// //                     console.log("Rest id is" + id)
// //                     for (let i = 0; i < json.results.length; i++) {
// //                         fetch(json.results[i].primary_image, {
// //                             method: "GET",
// //                             headers: {
// //                                 'Content-Type': 'application/json',
// //                             }
// //                         }).then(response => response.blob())
// //                         .then(imageBlob => {
// //                             const localImageURL = URL.createObjectURL(imageBlob);
// //                             setRestaurants(restaurants.concat(<Input
// //                                 key={restaurants.length}
// //                                 results={json.results[i]}
// //                                 image={localImageURL}
// //                                 />))
// //                         })
// //                     }
// //                 })
//     }

    //Used to create restaurant cards
    const Input = (props) => {
        return <>
        <div className="column">
            {/*Change 1 to ${id} later*/}
                    <Link to={`/restaurants/${props.id}/about`} className="card-link" >
                        <div className="card card-result">
                            <div className="card-image">
                                {/*<figure className="image is-4by3">*/}
                                {/*    <img src={props.image}/>*/}
                                {/*</figure>*/}
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <p className="title is-4">{props.name}</p>
                                        <p className="subtitle is-6">{props.address}</p>
                                    </div>
                                </div>
                                <div className="content">
                                    {props.description}
                                </div>
                            </div>
                            <footer className="card-footer">
                                <a className="card-footer-item darken"><i
                                    className="far fa-bookmark navy-blue"></i></a>
                                <a className="card-footer-item darken"><i className="far fa-heart light-red"></i></a>
                            </footer>
                        </div>
                    </Link>
                </div>
        </>
    }


    const renderResults = restaurants.map((restaurant, index) =>
        //Create a card for each search result
        <Input id = {restaurant.id} name={restaurant.name} address={restaurant.address} description={restaurant.description}/>
    )

    //Problem is with the navbar!
    if (loggedIn == false)
    {
        return <>
            <div>
                <Navbar/>
                <section className="hero is-primary hero-custom">
                    <div className="hero-body container">
                        <p className="title">
                            The world of restaurants. All in one place.
                        </p>
                        <div className="field">
                            <p className="control is-expanded has-icons-right">
                                <input className="input is-large is-rounded" type="text" placeholder="Search Restaurants" onChange={(e) => setQuery(e.target.value)}/>
                                <span className="icon is-right"><i className="fas fa-search"></i></span>
                            </p>
                        </div>
                    </div>
                </section>
                <div className="container p-4">
                    <div className="columns">
                        {renderResults}
                    </div>

                </div>
            </div>
        </>
    }
    else
    {
        return <>
            <div>
                <Navbar/>
                <section className="hero is-primary hero-custom">
                    <div className="hero-body container">
                        <p className="title">
                            The world of restaurants. All in one place.
                        </p>
                        <div className="field">
                            <p className="control is-expanded has-icons-right">
                                <input className="input is-large is-rounded" type="text" placeholder="Search Restaurants" onChange={(e) => setQuery(e.target.value)}/>
                                <span className="icon is-right"><i className="fas fa-search"></i></span>
                            </p>
                        </div>
                    </div>
                </section>
                <div className="container p-4">
                    <div className="columns">
                        {renderResults}
                    </div>

                </div>
            </div>
        </>
    }
}

export default Home;
