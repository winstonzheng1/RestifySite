import 'bulma/css/bulma.min.css';
import { Link, Outlet } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar";
import TabSelector from "../RestaurantTabs/TabSelector";
import '../../App.css'
import {FaThumbsUp} from "react-icons/fa";
import {useEffect, useState} from "react";
import $ from "jquery"
import { getToken, getTokenDecoded, saveToken } from "../../utils/tokenUtil"

const PostComment = (props) => {

    //Comment object
    const [comment, setComment] = useState({})
    const userId = getTokenDecoded().user_id
    const token = getToken()
    const [restaurantId, setRestaurantId] = useState(0)
    let resId = props.resId


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
        //setRestaurantId(props.restId)
    }, [])

    //Create comment object from fields
    const handleBlur = (event) => {

        // Get the name and value for the field
        let name = event.target.name;
        let value = event.target.value;

        setComment({
            ...comment,
            // add data for the field to user object
            [name]: value.trim()
        });
    };

    //Should use props restaurant id instead
    //Ajax POST function to submit a comment
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

        // Call new comment
        //blogPost.post_restaurant = restaurantId;

        $.ajax({
            url: `http://localhost:8000/comments/createcomment/${resId}`,
            method: 'POST',
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(comment),
            headers: {
                Authorization: 'Bearer ' + getToken(),
            },
            // Function to handle success response
            success: function(response) {
                //alert("comment added")
                props.data();
                console.log("response: ", response);
//                setFormError("User added");
                //window.location.href = `/restaurants/${resId}/comments`;
            },
            // Function to handle error response
            error: function(xhr, status, error) {
                if ( xhr.status === 400 )
                {
                    //                   setFormError("You cannot create more than one restaurant per account");
                    alert("Comment not added")
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


    //Needs submit button and submit handler
    //Add class names, form obsubmit, and field onblur
    return <>
        <article className="media">
            <figure className="media-left">
                <p className="image is-64x64">
                    <img src="https://bulma.io/images/placeholders/64x64.png"/>
                </p>
            </figure>
            <div className="media-content">
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <p className="control">
                            <textarea className="textarea" name="content" onBlur={handleBlur}></textarea>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <button className="button is-primary light-red-button">Post comment</button>
                        </p>
                    </div>
                </form>
            </div>
        </article>
    </>
}

export default PostComment;