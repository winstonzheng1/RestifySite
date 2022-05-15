import '../../App.css';
import 'bulma/css/bulma.min.css';
import { Link, Outlet } from 'react-router-dom'
import Logo from '../../media/logo.svg'
import Avatar from '../../media/profile_pic.jpg'
import { useHistory } from "react-router-dom";

const Banner = (props) => {
    return <>
        <section className="hero is-primary hero-custom">
            <div className="hero-body container">
                <p className="title">
                    {props.name}
                </p>
            </div>
        </section>
    </>
}

export default Banner;