import '../../App.css';
import 'bulma/css/bulma.min.css';
import { Link } from 'react-router-dom'
import {useEffect, useState} from "react";
import $ from "jquery"
import { getToken, getTokenDecoded, saveToken } from "../../utils/tokenUtil"
import Navbar from "../Navbar";
import BlogPostFeed from "../BlogPostFeed";

/*
<BlogPostFeed/>
        <BlogPostFeed/>
        <BlogPostFeed/>
*/

const Feed = () => {


    //Blog posts object called feed. Contains all the blog posts in the feed
    const [feed, setFeed] = useState([])


    const [inputList, setInputList] = useState([])
    const [restaurant, setRestaurant] = useState({})

    const userId = getTokenDecoded().user_id
    const token = getToken()

    //Populate
    // useEffect(()=>{
    //     //Fix to use restaurant ID instead of user ID
    //     fetch("http://localhost:8000/blogs/feed/", {
    //         method: "GET",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`,
    //         }
    //     }).then(response => response.json()).then(json => {
    //         setFeed(json)
    //         if (feed['count']) {
    //             for (var i=0; i<feed['count']; i++) {
    //                 fetch("http://localhost:8000/restaurants/" + feed['results'][i]['post_restaurant'] + "/", {
    //                     method: "GET",
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         'Authorization': `Bearer ${token}`,
    //                     }
    //                 })
    //                 .then(response => response.json())
    //                 .then(json => setRestaurant(json))
    //
    //                 console.log(feed['results'][i])
    //                 setInputList(inputList.concat(<BlogPostFeed
    //                     key={inputList.length}
    //                     title={feed['results'][i]['post_title']}
    //                     restaurant={restaurant['name']}
    //                     id={feed['results'][i]['post_restaurant']}
    //                     image={feed['results'][i]['post_media']}
    //                     />));
    //                 }
    //       }
    //     })
    // }, [])

    //Get the Feed
    useEffect(()=>{
        //Fix to use restaurant ID instead of user ID
        //Call the feed api
        fetch("http://localhost:8000/blogs/feed/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(json => {
                //Want to use json.results
                //Feed is now an aray of post objects
                setFeed(json.results)
                //Set the constant to the actual restaurant ID
                // fetch("http://localhost:8000/blogs/viewlist/"+json.id, {
                //     method: "GET",
                //     headers: {
                //         'Content-Type': 'application/json',
                //     }
                // })
                //     .then(response => response.json())
                //     .then(json => {
                //         //Set the constant to the actual restaurant ID
                //         // alert("Received blog posts")
                //         setBlogPost(json.results)
                //         // for (let i=0; i<blogPost.length; i++)
                //         // {
                //         //     console.log(blogPost[i])
                //         // }
                //     })
            })
        //alert("hi")
        //
    }, [])

    const renderFeed = feed.map((post, index) =>
        <BlogPostFeed restaurant = {"By " + post.restaurant_name }title={post.post_title} description={post.post_description}/>
    )

    return <>
        <Navbar/>
        {renderFeed}

    </>

}

export default Feed;
