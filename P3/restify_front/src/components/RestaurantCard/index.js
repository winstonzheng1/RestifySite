import '../../App.css';
import 'bulma/css/bulma.min.css';
import { Link } from 'react-router-dom'
import Logo from '../../media/logo.svg'
import Navbar from '../Navbar'
import {useEffect, useState} from "react";
import $ from "jquery"
import { getToken, getTokenDecoded, saveToken } from "../../utils/tokenUtil"
import {FaThumbsUp} from "react-icons/fa"
import {FaShare} from "react-icons/fa"

const Home = (props) => {

    const [restaurant, setRestaurant] = useState({})


    
  return <>
      <div>
        <div className="column">
            <a href="restaurant.html" className="card-link">
                <div className="card card-result">
                    <div className="card-image">
                        <figure className="image is-4by3">
                            <img src={require("../../media/restaurant01.jpg")}/>
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                <p className="title is-4">Sardi's</p>
                                <p className="subtitle is-6">New York, NY</p>
                            </div>
                        </div>
                        <div className="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut
                            labore et dolore magna aliqua.
                        </div>
                        <div>
                            <span className="tag is-light">Italian</span>
                        </div>
                    </div>
                    <footer className="card-footer">
                        <a className="card-footer-item darken"><i
                            className="far fa-bookmark navy-blue"></i></a>
                        <a className="card-footer-item darken"><i className="far fa-heart light-red"></i></a>
                    </footer>
                </div>
            </a>
        </div>
    </div>
  </>
}

export default Home;
