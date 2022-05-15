import '../../../App.css';
import 'bulma/css/bulma.min.css';
import { Link, Outlet } from 'react-router-dom'
import Logo from '../../../media/logo.svg'
import Avatar from '../../../media/profile_pic.jpg'
import { useHistory } from "react-router-dom";
import Banner from "../../Banner";
import Navbar from "../../Navbar";
import TabSelector from "../TabSelector";
import PostComment from "../../PostComment";
import Comment from "../../Comment";
import {useEffect, useState} from "react";
import { getToken, getTokenDecoded, saveToken } from "../../../utils/tokenUtil"
import BlogPostFeed from "../../BlogPostFeed";

const CommentPage = () => {

    //Comments object to populate
    const [comments, setComments] = useState([])
    //Keep track of number of comments
    const [numComments, setNumComments] = useState(0)

    const token = getToken()

    const [resId, setResId] = useState(0)
    const [restaurant, setRestaurant] = useState({})

    const [hasComments, setHasComments] = useState(true)

    let hasComments2 = true


    //This is for the myrestaurant page
    //Populates the comments page with the comments that exist for that restaurant
    //Need a case for if there are no comments yet!
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
                console.log("restaurant id is" + json.id)
                setResId(json.id)
                console.log("resId value is" + resId)
                //Set the constant to the actual restaurant ID
                //Now fetch the comments for that restaurant
                fetch("http://localhost:8000/comments/restaurant/"+json.id, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => {
                        console.log("Response is" + response.status)
                        if (response.status === 404)
                        {
                            //setHasComments(false)
                            hasComments2 = false
                            //Exit
                            return
                        }
                        //Otherwise, return the json properly and continue onwards
                        console.log("hasComments is" + hasComments2)
                        return response.json()
                    })
                    .then(json => {
                        //Set the constant to the actual restaurant ID
                        // alert("Received blog posts")
                        setComments(json.results)

                        //console.log("Response is" + response.ok)
                        for (let i=0; i<comments.length; i++)
                        {
                            console.log("comment id" + comments[i].user_id)
                        }
                    })
            })
        //alert("hi")
        //
    }, [numComments])



    const renderComments = comments.map((comment, index) =>
        //Get the actual username

        <>
            <Comment name = {comment.commentUsername} content={comment.content} time={comment.comment_create_time}/>
        </>

    )

    //Increment number of comments
    const changeState = () => {
        //alert("Hello from post comment component")
        console.log("hello")
        setNumComments(numComments + 1)
    }


    //console.log("The value of hasComments2 is: " + hasComments2)
    //console.log("Outer value of resId is: " + resId)

    if (comments.length === 0)
    {
        return <>
            <h1>This restaurant has no comments</h1>
            <PostComment resId={resId} data={changeState}/>
        </>
    }

    else if (comments.length !== 0)
    {
        return <>
            {renderComments}
            <PostComment resId={resId} data={changeState}/>
        </>
    }

    console.log("number of comments is" + numComments)

    //
    // return <>
    //     {renderComments}
    // </>
}

export default CommentPage;