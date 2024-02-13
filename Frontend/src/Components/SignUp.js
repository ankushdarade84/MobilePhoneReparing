// import React from 'react';
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";

const SignUp = () => {

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    mobileNo: '',
    address: '',
    password: '',
  });
  const [error, setError] = useState();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const userSignUp = (e) => {
    console.log("signupcalled");
    e.preventDefault();
    axios.post('http://localhost:8000/signUp', formData)
      .then((response) => {
        console.log(response);
        alert(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.data);
      });
  };

  const validateEmail = (emailid) => {
    let form = new FormData();
    form.append('email', emailid)
    axios.post('http://localhost:8000/validateemail', form)
      .then((response) => {
        console.log(response.status);
        if (response.status === 208) {
          setError('Mail Id Already used!');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <section class="text-center">

      <div class="p-5 bg-image" style={{ backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px', backgroundPosition: '0% 30%', backgroundSize: 'cover' }}></div>
      {/* <!-- Background image --> */}

      <div class="card mx-4 mx-md-5 shadow-5-strong" style={{ marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
        <div class="card-body py-5 px-md-5">

          <div class="row d-flex justify-content-center">
            <div class="col-lg-8">
              <h2 class="fw-bold mb-5">Sign up now</h2>
              <form onSubmit={userSignUp}>
                {/* <!-- 2 column grid layout with text inputs for the email and verify names --> */}
                <div class="row">
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input type="email" id="email-input" class={error === '' ? "form-control" : "form-control is-invalid"} placeholder='Email Id' required name="email" value={formData.email} onChange={handleChange} onFocus={() => { setError('') }} />
                    </div>
                    {error && <div><p>{error}</p></div>}
                  </div>
                  <div class="col-md-6 mb-4">
                    <button type="button" class="btn btn-info btn-block " onClick={() => validateEmail(formData.email)}>Verify Email</button>
                  </div>
                </div>

                {/* <!-- Email output --> */}
                <div class="form-outline mb-4">
                  <output id="email-output" class="form-control" />
                </div>

                {/* <!-- Name input --> */}
                <div class="form-outline mb-4">
                  <input type="text" id="name-input" class="form-control" placeholder='Enter Name' required name="name" value={formData.name} onChange={handleChange} />
                </div>

                {/* <!-- Mobile input --> */}
                <div class="form-outline mb-4">
                  <input type="tel" id="mobile-input" class="form-control" placeholder='Enter Mobile No.' required pattern="[0-9]{10}" name="mobileNo" value={formData.mobileNo} onChange={handleChange} />
                </div>

                {/* <!-- Address input --> */}
                <div class="form-outline mb-4">
                  <input type="text" id="adress-input" class="form-control" placeholder='Enter Address' required name="address" value={formData.address} onChange={handleChange} />
                </div>
                {/* <!-- Password input --> */}
                <div class="form-outline mb-4">
                  <input type="password" id="password-input" class="form-control" placeholder='Enter Password' required name="password" value={formData.password} onChange={handleChange} />
                </div>

                {/* <!-- Submit button --> */}
                <button type="submit" class="btn btn-primary btn-block">
                  Sign up
                </button>


                {/* <!-- Log In buttons --> */}


                <div class="d-flex align-items-center justify-content-center  py-3" >
                  <p class="mb-0 me-2" style={{ color: 'hsl(218, 41%, 19%)' }}>I have an account! </p>
                  <Link to="/">
                  <button type="button" class="btn btn-outline-primary mx-2">Log In</button>
                  </Link>
                </div>


              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { SignUp }