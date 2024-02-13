import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
const SendTicket = () => {
  const navigate = useNavigate();
  const {loginId } = useSelector((store) => store.UserReducer);
    const [formData, setFormData] = useState({
        mobileCompany: '',
        mobileModel: '',
        problemDescription: '',
        regDate: '',
        status: '',
        response:'',
        newDate:'',
        customerId:loginId,
        techId:'',

      });
   
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const sendtTicket = (e) => {
        console.log("Send Ticket start");
        e.preventDefault();
        axios.post('http://localhost:8000/sentticket', formData)
          .then((response) => {
            console.log(response);
            alert("Ticket Sent Succesfully");           
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
                  
                  <form onSubmit={sendtTicket}>

                    <div>
                    <h1 class="my-1 display-5 fw-bold mb-4">
                        <span style={{color: 'hsl(218, 41%, 25%)'}}>New Ticket</span>
                    </h1>
                    </div>
                    {/* <!-- Customer Id --> */}
                  
                    {/* <!-- mobile company --> */}
                    <div class="form-outline mb-4">
                      <input type="text" class="form-control" placeholder="Mobile Company" name="mobileCompany" value={formData.mobileCompany} onChange={handleChange}/>
                    </div>

                    {/* <!-- mobile modal  --> */}
                    <div class="form-outline mb-4">
                      <input type="text" class="form-control"  placeholder="Mobile Model" name="mobileModel" value={formData.mobileModel} onChange={handleChange}  /> 
                    </div>

                    {/* <!-- problem Description  --> */}
                    <div class="form-outline mb-4">
                      <input type="text" class="form-control"  placeholder="Problem Description" name="problemDescription" value={formData.problemDescription} onChange={handleChange}  /> 
                    </div>


                    {/* <!-- Submit button --> */}
                    <button type="submit" class="btn btn-info  btn-block mb-4">Send Ticket</button>



                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      );
}

export default SendTicket