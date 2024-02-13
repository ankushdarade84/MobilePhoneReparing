import React, { useState } from 'react';
import './Login.css';
// import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn, setLoginId, setUserType } from '../Redux/Actions/UserActions';

const Login = () => {
  const dispatch = useDispatch();
  const { loginId, userType } = useSelector((store) => store.UserReducer);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',

  });
  const [userTypes, setuserTypes] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginhandle = (e) => {
    console.log("submitted");

    e.preventDefault();
    if (userTypes === 'user') {
      axios.post('http://localhost:8000/login', formData)
        .then((response) => {
          if (response.data.Message === "Login Successful") {
            localStorage.setItem('loggedIn', true);
            localStorage.setItem('userType', response.data.UserType);
            localStorage.setItem('loginId', response.data.LoginId);
            dispatch(setLoginId(response.data.LoginId));
            dispatch(setUserType(response.data.UserType));

            dispatch(setLoggedIn(true));
            console.log("usertype",userType);
            if(userType==='admin'){
              console.log("usertypeaaa",userType);
              navigate('/admin')
            }else{
              navigate('/ticketlist')
            }
          
          }
          else {
            alert(response.data.Message);
          }

        })
        .catch((error) => {
          alert("Invalid Credentails");

        });
    }
    else {
      axios.post('http://localhost:8000/technicianlogin', formData)
        .then((response) => {


          if (response.data.Message === "Login Successful") {
            localStorage.setItem('loggedIn', true);
            localStorage.setItem('userType', "technician");
            localStorage.setItem('loginId', response.data.LoginId);
            dispatch(setLoginId(response.data.LoginId));
            dispatch(setUserType("technician"));
            dispatch(setLoggedIn(true));
            navigate('/ticketlist')
          }
          else {
            alert(response.data.Message);
          }
        })
        .catch((error) => {
          alert("Invalid Credentails");

        });
    }

  };

  // $(".toggle-password").click(function() {

  //   $(this).toggleClass("fa-eye fa-eye-slash");
  //   var input = $($(this).attr("toggle"));
  //   if (input.attr("type") == "password") {
  //     input.attr("type", "text");
  //   } else {
  //     input.attr("type", "password");
  //   }
  // });

  return (

    <section class="background-radial-gradient overflow-hidden">
      <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5" style={{ color: 'hsl(218, 81%, 95%)' }}>
        <div class="row gx-lg-5 align-items-center mb-5">
          <div class="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: '10' }}>
            <h1 class="my-5 display-5 fw-bold ls-tight">

              <span style={{ color: 'hsl(218, 81%, 75%)' }}>Mobile Phone <br />Reparing Center</span>
            </h1>
            <p class="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
              Raise Your Mobile Problem and Get Help from Technicians as Soon as Possible...
            </p>
          </div>

          <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div>

            <div class="card bg-glass">
              <div class="card-body px-4 py-5 px-md-5">

                <form onSubmit={(event) => { loginhandle(event) }}>


                  {/* <!-- Email input --> */}
                  <div class="form-outline mb-4">
                    <input type="email" id="email-input" class="form-control" placeholder="Email Id" name="email" value={formData.email} onChange={handleChange} />
                  </div>

                  {/* <!-- Password input --> */}
                  <div class="form-outline mb-4">
                    <input id="password-field" type="password" class="form-control" placeholder="Enter Password" name="password" value={formData.password} onChange={handleChange} />
                    <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span>

                  </div>
                  <select class="form-select mb-4 float-left" name='userTypes' onChange={(e) => setuserTypes(e.target.value)} aria-label="Default select example">
                    <option selected value=''>User Type</option>
                    <option value="user">User</option>
                    <option value="technician">Technician</option>
                  </select>

                  {/* <!-- Submit button --> */}

                  <button type="submit" disabled={userTypes === '' ? true : false} class="btn btn-primary btn-block mb-4">Log In</button>


                  <div class="d-flex align-items-center justify-content-center pb-4">
                    <p class="mb-0 me-2" style={{ color: 'hsl(218, 41%, 19%)' }}>Don't Have an account?  </p>

                    <button type="button" onClick={() => navigate('/signup')} class="btn btn-outline-primary mx-2">Sign Up</button>

                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

}
export { Login }