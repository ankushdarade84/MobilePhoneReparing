import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const AddTechnicians = () => {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        password: '',
        address: '',
        status:'InActive',

      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const techniciansignup = (e) => {
        console.log("Adding technicians Start");
        e.preventDefault();
        axios.post('http://localhost:8000/techniciansignup', formData)
          .then((response) => {
            console.log(response);
            alert(response.data);
            navigate('/ticketlist')
          })
          .catch((error) => {
            console.log(error.data);
            alert(error);
          });
      };
    
      return (
        <section class="background-radial-gradient overflow-hidden">
        <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5" style={{color: 'hsl(218, 81%, 95%)'}}>
          <div class="row gx-lg-6 align-items-center mb-5">


            <div class="col-lg">
              {/* <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div> */}

              <div class="card bg-glass">
                <div class="card-body">
                  
                  <form onSubmit={techniciansignup}>

                    <div>
                    <h1 class="my-1 display-5 fw-bold mb-4">
                        <span style={{color: 'hsl(218, 41%, 25%)'}}>New Technician</span>
                    </h1>
                    </div>
                    {/* <!-- tech Name--> */}
                    <div class="form-outline mb-4">
                      <input type="text" class="form-control" placeholder="Technician Name" name="name" value={formData.name} onChange={handleChange}/>
                    </div>
                    {/* <!-- tech mail --> */}
                    <div class="form-outline mb-4">
                      <input type="email" class="form-control" placeholder="Email" name="email" value={formData.email} onChange={handleChange}/>
                    </div>

                    {/* <!-- tech mobile  --> */}
                    <div class="form-outline mb-4">
                      <input type="text" class="form-control"  placeholder="Mobile No" name="mobileNo" value={formData.mobileNo} onChange={handleChange}  /> 
                    </div>

                    {/* <!-- tech address  --> */}
                    <div class="form-outline mb-4">
                      <input type="text" class="form-control"  placeholder="Address" name="address" value={formData.address} onChange={handleChange}  /> 
                    </div>

                    {/* <!-- tech pass  --> */}
                    <div class="form-outline mb-4">
                      <input type="text" class="form-control"  placeholder="Password" name="password" value={formData.password} onChange={handleChange}  /> 
                    </div>

                    {/* <!-- Submit button --> */}
                    <button type="submit" class="btn btn-info  btn-block mb-4">Add Technician</button>



                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      );
}

export default AddTechnicians