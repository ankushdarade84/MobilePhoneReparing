import axios from 'axios';
import React, { useState } from 'react'



const AddCustomer = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        mobileNo: '',
        address: '',
        password: '',

      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const addcustomer = (e) => {
        console.log("Add Customer Start");
        e.preventDefault();
        axios.post('http://localhost:8000/signUp', formData)
          .then((response) => {
            console.log(response);
            alert(response.data);
          })
          .catch((error) => {
            console.log(error.data);
            alert(error);
          });
      };

      const [error, setError] = useState();
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
        <section class="background-radial-gradient overflow-hidden">
        <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5" >
          <div class="row gx-lg-6 align-items-center mb-5">


            <div class="col-lg">
              {/* <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div> */}

              <div class="card bg-glass">
                <div class="card-body">
                  
                  <form onSubmit={addcustomer}>

                    <div>
                    <h1 class="my-1 display-5 fw-bold mb-4">
                        <span style={{color: 'hsl(218, 41%, 25%)'}}>New Customer</span>
                    </h1>


                    </div>
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
                  
                    <button type="submit" class="btn btn-info  btn-block mb-4">Add Customer</button>
                 

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      );
}

export default AddCustomer