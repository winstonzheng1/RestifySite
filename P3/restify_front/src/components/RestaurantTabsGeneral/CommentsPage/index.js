import '../../../App.css';
import 'bulma/css/bulma.min.css';
import {Link, Outlet, useParams} from 'react-router-dom'
import PostComment from "../../PostComment";
import Comment from "../../Comment";
import {useEffect, useState} from "react";
import {getToken} from "../../../utils/tokenUtil";

const CommentPageGeneral = () => {

    //Already have the restaurant id, it's actual (see below)
    let restId = useParams()

    //Comments object
    const [comments, setComments] = useState([])

    const [numComments,setNumComments]= useState(0)

    //This is the restaurant id
    let actual = parseInt(restId.restId)

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(()=>{

        //Check if user is logged in or not
        if (getToken() != null)
        {
            setLoggedIn(true)
        }
        //Fix to use restaurant ID instead of user ID

        //Get the json object for the desired restaurant
        fetch("http://localhost:8000/restaurants/" + actual + "/", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(json => {
                //Set the constant to the actual restaurant ID
                fetch("http://localhost:8000/comments/restaurant/"+json.id, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => {
                        //Check response status
                        if (response.status === 404)
                        {
                            return
                        }
                        //Otherwise, return the json properly and continue onwards
                        return response.json()
                    })
                    .then(json => {
                        //Set the constant to the actual restaurant ID
                        // alert("Received blog posts")
                        setComments(json.results)
                        // for (let i=0; i<blogPost.length; i++)
                        // {
                        //     console.log(blogPost[i])
                        // }
                    })
            })
        //alert("hi")
        //
    }, [numComments])

    const renderComments = comments.map((comment, index) =>
        //Get the actual restaurant title
        <Comment name={comment.commentUsername} content={comment.content} time={comment.comment_create_time}/>
    )

    const changeState = () => {
        setNumComments(numComments + 1)
    }

    //Needs to handle if a user is actually logged in or not

    if (loggedIn === false)
    {
        if (comments.length === 0)
        {
            return <>
                <h1>This restaurant has no comments</h1>
                {/*<PostComment resId={actual}/>*/}
            </>
        }

        else if (comments.length !== 0)
        {
            return <>
                {renderComments}
            </>
        }
    }
    else
    {
        if (comments.length === 0)
        {
            return <>
                <h1>This restaurant has no comments</h1>
                <PostComment resId={actual} data={changeState}/>
            </>
        }

        else if (comments.length !== 0)
        {
            return <>
                {renderComments}
                <PostComment resId={actual} data={changeState}/>
            </>
        }
    }


}

export default CommentPageGeneral;