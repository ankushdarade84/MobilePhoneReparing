import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const AddComponent = () => {
  const navigate = useNavigate();
  const {loginId } = useSelector((store) => store.UserReducer);
    const [formData, setFormData] = useState({
        componentTitle: '',
        requestingCompany: '',
        qty: '',
        regDate: '',
        requiredDate: '',
        techid:loginId,
        inStock:'',
        description:'',
        price:'',

      });
     
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const sendComponent = (e) => {
        console.log("Create Components");
        e.preventDefault();
        axios.post('http://localhost:8000/createcomponent', formData)
          .then((response) => {
            console.log(response);
            alert(response.data.Message);
            navigate('/ticketlist')
          })
          .catch((error) => {
            console.log(error);
            alert(error.data.Message);
          });
      };


    //   {
    //     "componentTitle": "string",
    //     "requestingCompany": "string",
    //     "qty": 0,
    //     "requiredDate": "2023-05-11T07:07:35.882Z",
    //     "techid": 0,
    //     "inStock": 0,
    //     "description": "string",
    //     "price": 0
    //   }
    
      return (
        <section class="background-radial-gradient overflow-hidden">
        <div class="container px-4 py-5 px-md-5 text-center text-lg-start" style={{color: 'hsl(218, 81%, 95%)'}}>
          <div class="row gx-lg-6 align-items-center mb-5">


            <div class="col-lg">
              {/* <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div> */}

              <div class="card bg-glass">
                <div class="card-body">
                  
                  <form onSubmit={sendComponent}>

                    <div>
                    <h1 class="my-1 display-5 fw-bold mb-4">
                        <span style={{color: 'hsl(218, 41%, 25%)'}}>New Components</span>
                    </h1>
                    </div>
                
                    <div class="form-outline mb-4">
                      <input type="text" class="form-control" placeholder="Component Name" name="componentTitle" value={formData.componentTitle} onChange={handleChange}/>
                    </div>
              
                    <div class="form-outline mb-4">
                      <input type="text" class="form-control" placeholder="Component Company" name="requestingCompany" value={formData.requestingCompany} onChange={handleChange}/>
                    </div>

                    <div class="form-outline mb-4">
                      <input type="text" class="form-control"  placeholder="Description" name="description" value={formData.description} onChange={handleChange}  /> 
                    </div>
            
                    <div class="form-outline mb-4">
                      <input type="text" class="form-control"  placeholder="Quantity" name="qty" value={formData.qty} onChange={handleChange}  /> 
                    </div>

                    <div class="form-outline mb-4">
                      <input type="text" class="form-control"  placeholder="In Stock " name="inStock" value={formData.inStock} onChange={handleChange}  /> 
                    </div>
            
                    <div class="form-outline mb-4">
                      <input type="date" class="form-control"  placeholder="Required Date" name="requiredDate" value={formData.requiredDate} onChange={handleChange}  /> 
                    </div>


                    <div class="form-outline mb-4">
                      <input type="text" class="form-control"  placeholder="Price " name="price" value={formData.price} onChange={handleChange}  /> 
                    </div>

                    {/* <!-- Submit button --> */}
                    <button type="submit" class="btn btn-info  btn-block mb-4">Add component </button>



                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      );
}

export default AddComponent