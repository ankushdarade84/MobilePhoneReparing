import React, { useEffect, useState } from 'react'

import "../Admin/Admin.css";
import axios from 'axios';
import { Link } from 'react-router-dom';


function CustomerList() {
  const [index, setIndex] = useState(0);
  const[data,setData]=useState([]);
  const loginhandle = (e) => {

    axios.get('http://localhost:8000/getallticket')
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
         {/* <div class="container  py-2 text-center text-lg-start" style={{color: 'hsl(218, 81%, 95%)'}}> */}
    <div className='Container'>
     <h2 className="text-center py-4">Ticket List</h2>
     <div class="d-grid gap-2">
     <div className="container px-4 py-0">
   
         <button className="btn btn-info float-right  mg-2 my-4" style={{float: 'right'}} >Back to home</button>
   
    </div>
  
     
      <div>
        <table className="table" style={{color:'#ffffff'}}>
          <thead>
            <tr className="text-center">
              <th scope="col">Ticket Id</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Mobile Model</th>
              <th scope="col">Mobile Company</th>
              <th scope="col">Regstartion Date </th>
              <th scope="col">Technician Name </th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index1) => (
            <tr key={index1} className="text-center" >
                <td>{value.ticketId}</td>
                <td>{value.customerId.name}</td>
                <td>{value.mobileModel}</td>
                <td>{value.mobileCompany}</td>
                <td>{value.regDate}</td>
                <td>{value.techId.name}</td>
                <td>{value.status}</td>
            <td style={{width:'15%' }}>
                <button style={{marginLeft: "5px"}} type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModal" onClick={() => setIndex(index1)}>View</button>
                <button style={{marginLeft: "5px"}} type="button" className="btn btn-danger">Delete</button>
            </td>
            
            </tr>))}
          </tbody>
        </table>
       </div>
{/* </div> */}
        
  

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{color:'hsl(218, 41%, 20%)'}}>
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title mx-2" id="exampleModalLabel">Ticket Details</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" >
              <table className="mx-4">
                <tr>
                  <th className="mx-2">Ticket Id :</th>
                  <th>{data[index]?.ticketId}</th>
                </tr>
                <tr>
                  <th >Customer Id: </th>
                  <th>{data[index]?.customerId.id}</th>
                </tr>
                <tr>
                  <th>Customer Name: </th>
                  <th>{data[index]?.customerId.name}</th>
                </tr>
                <tr>
                  <th>Mobile Company: </th>
                  <th>{data[index]?.mobileCompany}</th>
                </tr>
                <tr>
                  <th >Mobile Model: </th>
                  <th>{data[index]?.mobileModel}</th>
                </tr>
                <tr>
                  <th >Problem Description: </th>
                  <th>{data[index]?.problemDescription}</th>
                </tr>
                <tr>
                  <th >Regstartion Date: </th>
                  <th>{data[index]?.regDate}</th>
                </tr>
                <tr>
                  <th >Response By tech: </th>
                  <th>{data[index]?.response}</th>
                </tr>
                <tr>
                  <th >Response Date: </th>
                  <th>{data[index]?.newDate}</th>
                </tr>
                <tr>
                  <th >Tech Id: </th>
                  <th>{data[index]?.techId.id}</th>
                </tr>
                <tr>
                  <th >Technician Name: </th>
                  <th>{data[index]?.techId.name}</th>
                </tr>
                <tr>
                  <th >Copmponents: </th>
                  <th>{data[index]?.componentId.componentId}</th>
                </tr>
                <tr>
                  <th >Ticket Status: </th>
                  <th>{data[index]?.status}</th>
                </tr>
                
              </table>
              <div>
                Id  : <input value={data[index]?.id} ></input>
              </div>
              <div>
                Name  : <input value={data[index]?.name} onChange={(e)=>setData(...data[index],data[index]?.name)} ></input>

              </div>
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