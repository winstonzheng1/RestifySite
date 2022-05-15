import '../../App.css';
import 'bulma/css/bulma.min.css';
import { Link } from 'react-router-dom'
import {useEffect, useState} from "react";
import $ from "jquery"
import { getToken, getTokenDecoded, saveToken } from "../../utils/tokenUtil"
import FriendsEating from "../../media/blog_friends_eating.jpg"
import {FaThumbsUp} from "react-icons/fa"
import {FaShare} from "react-icons/fa"
import Navbar from "../Navbar";
import Friends from "../../media/blog_friends_eating.jpg"


//Use props to have the blog post id passed in so that useeffect can handle the rest


const BlogPostPage = (props) => {

    //Blog post object
    const [post, setPost] = useState({})


    //Viewpost gets a json object, use that json object
    //Try getting post #1 first

    //Get a post by ID


    useEffect(()=>{
        //Fix to use restaurant ID instead of user ID
        fetch("http://localhost:8000/blogs/viewpost/1", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(json => {
                //setName(json.name)
                //Set the constant to the actual restaurant ID
                //Get information from the blog post json object

                //Store the blog post json information
                setPost(json)
                //console.log(post.post_title)

            })
        //alert("hi")
        //
    }, [])

    return <>
        <Navbar/>
        {/*{renderPost}*/}
        <section className="hero is-info">
            <div className="hero-body container">
                <p className="title">
                    {post.post_title}
                </p>
                <p className="subtitle">
                    {post.post_restaurant}
                </p>
                <a>
                    {/*<i className="far fa-thumbs-up icon-x-large"></i>*/}
                    <FaThumbsUp/>
                </a> 100  <a>
                <FaShare/>
            </a>
            </div>
        </section>
        <div className="container p-4">
            <div className="columns is-centered">
                <div className="column is-three-fifths">
                    <figure className="image is-3by2">
                        <img src={Friends} alt="Friends Eating"/>
                    </figure>
                    <p className="pt-4">
                        {post.post_description}
                    </p>
                </div>
            </div>
        </div>

    </>
}

export default BlogPostPage;
