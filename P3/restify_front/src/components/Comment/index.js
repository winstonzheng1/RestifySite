import 'bulma/css/bulma.min.css';
import { Link, Outlet } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar";
import TabSelector from "../RestaurantTabs/TabSelector";
import '../../App.css'
import {FaThumbsUp} from "react-icons/fa";
const Comment = (props) => {

    //Pass props in to fill the author, time, and content
    console.log("name is" + props.name)
    return <>
        <div className="tab-content" id="comments">
            <article className="media">
                <figure className="media-left">
                    <p className="image is-64x64">
                        <img src="https://bulma.io/images/placeholders/64x64.png"/>
                    </p>
                </figure>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>{props.name}</strong> <small>{props.time}</small>
                            <br/>
                            {props.content}
                            <br/>
                            <span>
                                <a>
                                {/*<i className="far fa-thumbs-up navy-blue"></i>*/}
                                <FaThumbsUp/>
                                </a> 2
                            </span>
                        </p>
                    </div>
                </div>
            </article>
        </div>
    </>
}

export default Comment;