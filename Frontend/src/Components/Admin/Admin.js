import React, { useEffect, useState } from 'react'

import "./Admin.css";
import axios from 'axios';
import { Link } from 'react-router-dom';


function Admin() {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const loginhandle = (e) => {

    axios.get('http://localhost:8000/getalltechnician')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.data);
      });
  };
  useEffect(() => {
    loginhandle();
  }, []);

  return (
    <section className="background-radial-gradient overflow-hidden px-5 py-5" style={{ color: 'White' }} >
      <div class="container px-2 py-3 px-md-8 text-center text-lg-start my-5" style={{ color: 'hsl(218, 81%, 95%)' }}>
        <div className='Container'>
          <h2 className="text-center py-4">Technicians List</h2>
          <div class="d-grid gap-2">
            <div className="container px-4 py-0">
              <Link to="/addtech">
                <button className="btn btn-info btn-lg float-right  mg-2 my-4" style={{ float: 'right' }} > New Technicians</button>
              </Link>
            </div>


            <div>
              <table className="table" style={{ color: '#ffffff' }}>
                <thead>
                  <tr className="text-center">
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email Id</th>
                    <th scope="col">Status</th>
                    <th scope="col">Ticket Count</th>
                    <th scope="col">Active Tickets</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((value, index1) => (
                    <tr key={index1} className="text-center" >
                      <td>{value.id}</td>
                      <td>{value.name}</td>
                      <td>{value.email}</td>
                      <td>{value.status}</td>
                      <td>{value.ticketcount}</td>
                      <td>{value.activeTicketCount}</td>
                      <td>
                        <button style={{ marginLeft: "10px" }} type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModal" onClick={() => setIndex(index1)}>View</button>
                     
                      </td>

                    </tr>))}
                </tbody>
              </table>
            </div>
          </div>



          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ color: 'hsl(218, 41%, 20%)' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title mx-2" id="exampleModalLabel">Modal title</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                {/* <div className="modal-body" >
                  <table className="mx-4">
                    <tr>
                      <th className="mx-2">Id :</th>
                      <th>{data[index]?.id}</th>
                    </tr>
                    <th >Name: </th>
                    <th>{data[index]?.name}</th> */}
                      <div className="modal-body" >
                            <table className='modalTable'>
                                <tbody >
                                    <tr className='modalTableRow'>
                                        <td className='label'>Id</td>
                                        <td className='value'>{data[index]?.id}</td>
                                    </tr>
                                    <tr className='modalTableRow'>
                                        <td className='label'>Name</td>
                                        <td className='value'>{data[index]?.name}</td>
                                    </tr>
                                    <tr className='modalTableRow'>
                                        <td className='label'>Address</td>
                                        <td className='value'>{data[index]?.address}</td>
                                    </tr>
                                    <tr className='modalTableRow'>
                                        <td className='label'>Email</td>
                                        <td className='value'>{data[index]?.email}</td>
                                    </tr>
                                    <tr className='modalTableRow'>
                                        <td className='label'>Mobile No</td>
                                        <td className='value'>{data[index]?.mobileNo}</td>
                                    </tr>
                                    <tr>
                                        <td className='label' >Ticket Count</td>
                                        <td className='value'>{data[index]?.ticketcount}</td>
                                    </tr>
                                    <tr>
                                        <td className='label' >Active Ticket Count</td>
                                        <td className='value'>{data[index]?.activeTicketCount}</td>
                                    </tr>
                                    <tr>
                                        <td className='label' >Technician Status</td>
                                        <td className='value'>{data[index]?.status}</td>
                                    </tr>
                                    <tr>
                                        <td className='label' >Componets Used Id</td>
                                        <td className='value'>{data[index]?.partUsed}</td>
                                    </tr>
                                    <tr className='modalTableRow'>
                                        <td className='label'>Component Price</td>
                                        <td className='value'>{data[index]?.partPrice}</td>
                                    </tr>
                                </tbody>
                  </table>
                  {/* <div>
                Id  : <input value={data[index]?.id} ></input>
              </div>
              <div>
                Name  : <input value={data[index]?.name} onChange={(e)=>setData(...data[index],data[index]?.name)} ></input>

              </div> */}
                </div>

              
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div class="container px-2 py-3 px-md-8 text-center text-lg-start my-5" style={{ color: 'White' }} >
        <div className='Container'>
          <h2 className="text-center py-2">Customer</h2>
          <div className="row py-4 px-2">
            <div class="col-lg">
              <Link to="/addcustomer">
                <button type="button" className="btn btn-warning btn-block">Add Customer</button>
              </Link>
            </div>

            <div class="col-lg">
              <Link to="/customerlist">
                <button type="button" className="btn btn-warning btn-block">Customer List</button>
              </Link>
            </div>

            <div class="col-lg">
              <Link to="/ticketlist">
                <button type="button" className="btn btn-warning btn-block">Ticket List</button>
              </Link>
            </div>

            <div class="col-lg">
              <Link to="/addcomponent">
                <button type="button" className="btn btn-warning btn-block">Add Component</button>
              </Link>
            </div>

            <div class="col-lg">
              <Link to="/componentlist">
                <button type="button" className="btn btn-warning btn-block">Component List</button>
              </Link>
            </div>

          </div>




        </div>
      </div> */}



    </section>

  )
}

export default Admin