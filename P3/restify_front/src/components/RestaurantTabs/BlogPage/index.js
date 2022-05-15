import '../../../App.css';
import 'bulma/css/bulma.min.css';
import { Link, Outlet } from 'react-router-dom'
import Logo from '../../../media/logo.svg'
import Avatar from '../../../media/profile_pic.jpg'
import { useHistory } from "react-router-dom";
import Banner from "../../Banner";
import Navbar from "../../Navbar";
import TabSelector from "../TabSelector";
import Spaghetti from "../../../media/blog_spaghetti.jpg"
import Breadsticks from "../../../media/blog_breadsticks.jpg"
import FriendsEating from "../../../media/blog_friends_eating.jpg";
import {FaShare, FaThumbsUp} from "react-icons/fa";
import {useEffect, useState} from "react";
import $ from "jquery"
import { getToken, getTokenDecoded, saveToken } from "../../../utils/tokenUtil"
import BlogPostFeed from "../../BlogPostFeed";

const BlogPage = () => {

    //Blog posts object
    const [blogPost, setBlogPost] = useState([])
    //const [restaurantId, setRestaurantId] = useState(0)
    const token = getToken()
    let restaurantName = "ss"
    const [name, setName] = useState("")

    let hasPosts = true
    const [hasPosts2, setHasPosts2] = useState(true)

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
                setName(json.name)
                //Set the constant to the actual restaurant ID
                fetch("http://localhost:8000/blogs/viewlist/"+json.id, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => {
                        if (response.status === 404)
                        {
                            console.log("Response is" + response.status)
                            hasPosts = false
                            setHasPosts2(true)
                            return
                        }
                        return response.json()
                    })
                    .then(json => {
                        //Set the constant to the actual restaurant ID
                        // alert("Received blog posts")
                        setBlogPost(json.results)
                        // for (let i=0; i<blogPost.length; i++)
                        // {
                        //     console.log(blogPost[i])
                        // }
                    })
            })
        //alert("hi")
        //
    }, [blogPost.length])

    const renderFeed = blogPost.map((post, index) =>
        //Get the actual restaurant title
        <BlogPostFeed restaurant = {name} title={post.post_title} description={post.post_description}/>
    )

    console.log("hasPosts2 is" + hasPosts2)


    if (blogPost.length === 0)
    {
        return <>
            <h1>No posts</h1>
            {renderFeed}
        </>
    }

    else if (blogPost.length !== 0)
    {
        return <>
            {renderFeed}
        </>
    }

    // return <>
    //     {renderFeed}
    // </>
}

export default BlogPage;