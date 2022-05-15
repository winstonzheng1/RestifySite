import '../../../App.css';
import 'bulma/css/bulma.min.css';
import {Link, Outlet, useParams} from 'react-router-dom'
import {useEffect, useState} from "react";
import { getToken, getTokenDecoded, saveToken } from "../../../utils/tokenUtil"
import BlogPostFeed from "../../BlogPostFeed";

const BlogPageGeneral = () => {

    let restId = useParams()
    //Blog posts object
    const [blogPost, setBlogPost] = useState([])
    //const [restaurantId, setRestaurantId] = useState(0)
    const [name, setName] = useState("")
    let actual = parseInt(restId.restId)
    const [restaurant,setRestaurant] = useState({})

    //Get the current restaurant ID
    useEffect(()=>{
        //Fix to use restaurant ID instead of user ID
        fetch("http://localhost:8000/restaurants/" + actual + "/" , {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer ' + getToken()
            }
        })
            .then(response => response.json())
            .then(json => {
                setName(json.name)
                setRestaurant(json)
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
        <BlogPostFeed restaurant = {name}title={post.post_title} description={post.post_description}/>
    )

    if (blogPost.length === 0)
    {
        return <>
            <h1>This restaurant has not made any blog posts</h1>
        </>
    }
    else if (blogPost.length !== 0)
    {
        return <>
            {renderFeed}
        </>
    }


}

export default BlogPageGeneral;