import React, { useEffect, useState } from 'react'

import "../Admin/Admin.css";
import axios from 'axios';
import { Link } from 'react-router-dom';


function CustomerList() {
  const [index, setIndex] = useState(0);
  const[data,setData]=useState([]);
  const loginhandle = (e) => {

    axios.get('http://localhost:8000/getuserbytype/user')
      .then((response) => {
       setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        {alert(error.data)}
      });
  };
  useEffect(()=>{
loginhandle();
  },[]);

  return (
    <section className="background-radial-gradient overflow-hidden px-5 py-5"  style={{color:'White'}} >
         <div class="container px-2 py-3 px-md-8 text-center text-lg-start my-5" style={{color: 'hsl(218, 81%, 95%)'}}>
    <div className='Container'>
     <h2 className="text-center py-4">Customer List</h2>
     <div class="d-grid gap-2">

  
     
      <div>
        <table className="table" style={{color:'#ffffff'}}>
          <thead>
            <tr className="text-center">
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email Id</th>
              <th scope="col">Mobile No</th>
              <th scope="col">Adress </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index1) => (
            <tr key={index1} className="text-center" >
                <td>{value.id}</td>
                <td>{value.name}</td>
                <td>{value.email}</td>
                <td>{value.mobileNo}</td>
                <td>{value.address}</td>
            <td>
                <button style={{marginLeft: "10px"}} type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModal" onClick={() => setIndex(index1)}>View</button>
                <button style={{marginLeft: "10px"}} type="button" className="btn btn-danger">Delete</button>
            </td>
            
            </tr>))}
          </tbody>
        </table>
       </div>
</div>
        
  

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{color:'hsl(218, 41%, 20%)'}}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title mx-2" id="exampleModalLabel">User Details</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" >
              <table className="mx-4">
                <tr>
                  <th className="mx-2">Id :</th>
                  <th>{data[index]?.id}</th>
                </tr>
                <tr>
                  <th >email: </th>
                  <th>{data[index]?.email}</th>
                </tr>
                <tr>
                  <th >Mobile: </th>
                  <th>{data[index]?.mobileNo}</th>
                </tr>
                <tr>
                  <th >Address: </th>
                  <th>{data[index]?.address}</th>
                </tr>
                  
              </table>
              {/* <div>
                Id  : <input value={data[index]?.id} ></input>
              </div>
              <div>
                Name  : <input value={data[index]?.name} onChange={(e)=>setData(...data[index],data[index]?.name)} ></input>

              </div> */}
              </div>
    
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>





    </section>
   
  )
}

export default CustomerList