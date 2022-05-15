import 'bulma/css/bulma.min.css';
import { Link, Outlet } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import Navbar from "../Navbar";
import TabSelector from "../RestaurantTabs/TabSelector";
import '../../App.css'
import {FaThumbsUp} from "react-icons/fa";

const MenuItem = (props) => {

    return <>
        <p className="left-text underline py-2">
            <h1 className=" is-size-4 has-text-weight-bold">{props.name}</h1>
            <br/>
            {props.description}
            <span className="right-text">${props.price}</span>
        </p>
    </>
}

export default MenuItem;