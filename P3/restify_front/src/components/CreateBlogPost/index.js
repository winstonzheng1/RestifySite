import '../../App.css';
import 'bulma/css/bulma.min.css';
import { Link } from 'react-router-dom'
import {useEffect, useState} from "react";
import $ from "jquery"
import { getToken, getTokenDecoded, saveToken } from "../../utils/tokenUtil"
import FriendsEating from "../../media/blog_friends_eating.jpg"
import {FaThumbsUp} from "react-icons/fa"
import {FaShare} from "react-icons/fa"

const CreateBlogPost = () => {

    //Blog post object
    const [blogPost, setBlogPost] = useState({})
    const [restaurantId, setRestaurantId] = useState(0)
    const token = getToken()

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
                //Set the constant to the actual restaurant ID
                setRestaurantId(json.id)
            })
    }, [])

    //Create blog post object from fields
    const handleBlur = (event) => {

        // Get the name and value for the field
        let name = event.target.name;
        let value = event.target.value;

        setBlogPost({
            ...blogPost,
            // add data for the field to user object
            [name]: value.trim()
        });
    };

    //Ajax POST function
    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(restaurant);

//        setFormError('');

//        if ( validateUser(user) === false )
//        {
//            console.log('At least one field is invalid.');
//            setFormError('At least one field is invalid');
//            return;
//        }

        // Call new restaurant API
        blogPost.post_restaurant = restaurantId;
        $.ajax({
            url: 'http://localhost:8000/blogs/createpost/',
            method: 'POST',
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(blogPost),
            headers: {
                Authorization: 'Bearer ' + getToken(),
            },
            // Function to handle success response
            success: function(response) {
                alert("Post added")
                console.log("response: ", response);
//                setFormError("User added");
                window.location.href = "/myrestaurant/blog";
            },
            // Function to handle error response
            error: function(xhr, status, error) {
                if ( xhr.status === 400 )
                {
                    //                   setFormError("You cannot create more than one restaurant per account");
                    alert("Post not added")
                }
                else if(xhr.status === 401) {
//                    setFormError("You are not authorized to do this");
                    alert("Unauthorized")
                }
                else
                {
//                    setFormError("Server error");
                    alert("Server error")
                }
            }
        });
    }

//Add class names, form onsubnmit, and field onblur
    return <>
        <div className="container pt-4">
            <div className="columns is-centered">
                <div className="column is-half">
                    <p className="title has-text-centered has-text-weight-bold">Create a post</p>
                    <form className="pb-6" onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Title</label>
                            <div className="control">
                                <input className="input" type="text" name="post_title" placeholder="Title" required onBlur={handleBlur}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Description</label>
                            <div className="control">
                                <textarea className="textarea" name="post_description" required onBlur={handleBlur}></textarea>
                            </div>
                        </div>
                        <label className="label">Image</label>
                        <div className="file is-normal">
                            <label className="file-label">
                                <input className="file-input" type="file" name="image"/>
                        <span className="file-cta">
                            <span className="file-icon">
                                <i className="fas fa-upload"></i>
                            </span>
                            <span className="file-label">
                                Choose a file
                            </span>
                        </span>
                            </label>
                        </div>
                        <br/>
                            <div className="has-text-centered">
                                <button className="button is-info hero-custom">Submit</button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default CreateBlogPost;
