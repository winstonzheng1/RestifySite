import '../../../App.css';
import 'bulma/css/bulma.min.css';
import { Link, Outlet } from 'react-router-dom'
import Logo from '../../../media/logo.svg'
import Avatar from '../../../media/profile_pic.jpg'
import { useHistory } from "react-router-dom";
import Banner from "../../Banner";
import Navbar from "../../Navbar";
import TabSelector from "../TabSelector";
const AdminPage = () => {
    return <>
        <div className="tab-content" id="admin">
            <div className="columns">
                <div className="column is-one-fifth">
                    <aside className="menu">
                        <p className="menu-label">
                            Blog
                        </p>
                        <ul className="menu-list">
                            <li>
                                {/*<a href="create-post.html">Create Post</a>*/}
                                <Link to="/myrestaurant/createpost">
                                    <span>
                                        Create Post
                                    </span>
                                </Link>
                            </li>
                        </ul>
                        <p className="menu-label">
                            Restaurant
                        </p>
                        <ul className="menu-list">
                            <li>
                                {/*<a href="edit-restaurant.html">Edit Restaurant</a>*/}
                                <Link to="/myrestaurant/editrestaurant">
                                    <span>
                                        Edit Restaurant
                                    </span>
                                </Link>
                            </li>
                        </ul>
                        <ul className="menu-list">
                            <li>
                                {/*<a href="edit-menu.html">Edit Menu</a>*/}
                                <Link to="/myrestaurant/addmenu">
                                    <span>
                                        Add Menu
                                    </span>
                                </Link>
                            </li>
                        </ul>
                        <ul className="menu-list">
                            <li>
                                {/*<a href="edit-menu.html">Edit Menu</a>*/}
                                <Link to="/myrestaurant/editmenu">
                                    <span>
                                        Edit Menu
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </aside>
                </div>
            </div>
        </div>


    </>
}

export default AdminPage;