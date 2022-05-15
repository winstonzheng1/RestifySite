import '../../App.css';
import 'bulma/css/bulma.min.css';
import { Link } from 'react-router-dom'
import {useEffect, useState} from "react";
import $ from "jquery"
import { getToken, getTokenDecoded, saveToken } from "../../utils/tokenUtil"
import Navbar from "../Navbar";
import {FaEnvelope, FaFax, FaGlobe, FaPhone} from "react-icons/fa";

const NewRestaurant = () => {

    //Restaurant object
    const [restaurant, setRestaurant] = useState({});

    //Create restaurant object from fields
    const handleBlur = (event) => {

        // Get the name and value for the field
        let name = event.target.name;
        let value = event.target.value;

//        validate(name,value);

        setRestaurant({
            ...restaurant,
            // add data for the field to user object
            [name]: value.trim()
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(restaurant);
        console.log("test")
        restaurant.primary_image = document.getElementById("file_input").files[0]
        var formData = new FormData()
        console.log("test2")
        formData.append("name", restaurant.name)
        formData.append("description", restaurant.description)
        formData.append("website", restaurant.website)
        formData.append("email", restaurant.email)
        formData.append("phone", restaurant.phone)
        formData.append("fax", restaurant.fax)
        formData.append("address", restaurant.address)
        formData.append("postal_code", restaurant.postal_code)
        //formData.append("primary_image", restaurant.primary_image)
        console.log("test3")

//        setFormError('');

//        if ( validateUser(user) === false )
//        {
//            console.log('At least one field is invalid.');
//            setFormError('At least one field is invalid');
//            return;
//        }

        if ( (typeof restaurant.primary_image) === 'object')
        {
            formData.append("primary_image", restaurant.primary_image);
        }

        // Call new restaurant API
        $.ajax({
            url: 'http://localhost:8000/restaurants/',
            enctype:"multipart/form-data",
            method: 'POST',
//            headers: {"Authorization": },  //token
            //contentType:"application/json; charset=utf-8",
            data: formData,//JSON.stringify(restaurant),
            contentType: false,
            processData: false,
            cache: false,
            headers: {
                Authorization: 'Bearer ' + getToken(),
            },
            // Function to handle success response
            success: function(response) {
                console.log("response: ", response);
//                setFormError("User added");
                window.location.href = "/myrestaurant/about";
            },
            // Function to handle error response
            error: function(xhr, status, error) {

                if ( xhr.status === 400 )
                {
 //                   setFormError("You cannot create more than one restaurant per account");
                    console.log(xhr)
                    alert("Only 1 restaurant per account")
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

  return <>
      <Navbar/>
      <div>
          <div className="container pt-4">
              <div className="columns is-centered">
                  <div className="column is-half">
                      <p className="title has-text-centered has-text-weight-bold">Add your restaurant</p>
                      <p>Note: a user can only own one restaurant at a time</p>
                      <br/>
                      <form className="pb-6" onSubmit={handleSubmit}>
                          <div className="field">
                              <label className="label">Restaurant Name</label>
                              <input className="input" type="text" name="name" placeholder="Name" required onBlur={handleBlur}/>
                          </div>
                          <div className="field">
                              <label className="label">About</label>
                              <div className="control">
                                  <textarea className="textarea" name="description" placeholder="Write a description about your restaurant" required onBlur={handleBlur}></textarea>
                              </div>
                          </div>
                          <div className="field">
                              <label className="label">Contacts</label>
                              <div className="control has-icons-left">
                                  <input className="input" type="text" name="website" placeholder="Website" required onBlur={handleBlur}/>
                                  <span className="icon is-small is-left">
                                    <FaGlobe/>
                                </span>
                              </div>
                              <div className="control has-icons-left">
                                  <input className="input" type="text" name="email" placeholder="Email" required onBlur={handleBlur}/>
                                  <span className="icon is-small is-left">
                                    <FaEnvelope/>
                                </span>
                              </div>
                              <div className="control has-icons-left">
                                  <input className="input" type="text" name="phone" placeholder="Phone" required onBlur={handleBlur}/>
                                  <span className="icon is-small is-left">
                                    <FaPhone/>
                                </span>
                              </div>
                              <div className="control has-icons-left">
                                  <input className="input" type="text" name="fax" placeholder="Fax" required onBlur={handleBlur}/>
                                  <span className="icon is-small is-left">
                                    <FaFax/>
                                </span>
                              </div>
                          </div>
                          <div className="field">
                              <label className="label">Location</label>
                              <div className="control">
                                  <input className="input" type="text" name="address" placeholder="Location" required onBlur={handleBlur}/>
                                  <input className="input" type="text" name="postal_code" placeholder="Postal Code" required onBlur={handleBlur}/>
                              </div>
                          </div>
                          <div className="field">
                              <label className="label">Upload images</label>
                              <div className="file is-normal">
                                  <label className="file-label">
                                      <input className="file-input" id="file_input" type="file" name="primary_image" onBlur={handleBlur}/>
                                      <span className="file-cta">
                            <span className="file-icon">
                                <i className="fas fa-upload"></i>
                            </span>
                            <span className="file-label">
                                Choose files
                            </span>
                        </span>
                                  </label>
                              </div>
                              <br/>
                              <div className="has-text-centered">
                                  <button className="button is-info hero-custom">Submit</button>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </>

}

export default NewRestaurant;
