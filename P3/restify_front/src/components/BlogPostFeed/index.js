import '../../App.css';
import 'bulma/css/bulma.min.css';
import { Link } from 'react-router-dom'
import {useEffect, useState} from "react";
import $ from "jquery"
import { getToken, getTokenDecoded, saveToken } from "../../utils/tokenUtil"
import FriendsEating from "../../media/blog_friends_eating.jpg"
import {FaThumbsUp} from "react-icons/fa"
import {FaShare} from "react-icons/fa"

//props: title, restaurant, image, id
const BlogPostFeed = (props) => {

    return <>
        <div className="container p-4">
            <div className="columns is-centered">
                <div className="column is-two-fifths">
                    <div className="card mb-4">
                        <div className="card-content">
                            <p className="title">
                                {props.title}
                            </p>
                            <p className="subtitle">
                                {props.restaurant}
                            </p>
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img src={props.image} alt="Blog Post Picture"/>
                                </figure>
                            </div>
                        </div>
                        <footer className="card-footer">
                            {/*<a className="card-footer-item darken" href="post.html">View Post</a>*/}
                            <Link to="/home" className="card-footer-item darken">
                                    <span>
                                        View Post
                                    </span>
                            </Link>
                            <a className="card-footer-item darken">
                                {/*<i className="far fa-thumbs-up navy-blue"></i>*/}
                                <FaThumbsUp/>
                            </a>
                            <a className="card-footer-item darken">
                                {/*<i className="fas fa-share navy-blue"></i>*/}
                                <FaShare/>
                            </a>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default BlogPostFeed;
