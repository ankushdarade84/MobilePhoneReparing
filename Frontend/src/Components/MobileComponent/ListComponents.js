import React, { useEffect, useState } from 'react'

import "../Admin/Admin.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ComponentsList() {
  const navigate=useNavigate();
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const loginhandle = (e) => {

    axios.get('http://localhost:8000/getallcomponent')
      .then((response) => {
        setData(response.data.Components);
      })
      .catch((error) => {
        console.log(error);
        alert(error.data);
      });
  };
  useEffect(() => {
    loginhandle();
  }, []);

  //   {
  //     "componentTitle": "string",
  //     "requestingCompany": "string",
  //     "qty": 0,
  //     "requiredDate": "2023-05-11T08:40:47.171Z",
  //     "techid": 0,
  //     "inStock": 0,
  //     "description": "string",
  //     "price": 0
  //   }

  return (
    <section className="background-radial-gradient overflow-hidden px-2 py-2" style={{ color: 'White' }} >
      <div class="container text-center text-lg-start my-5" style={{ color: 'hsl(218, 81%, 95%)' }}>
        <div className='Container'>
          <h2 className="text-center py-4">Components List</h2>
          <div style={{ display: 'block', marginLeft: '85%' }}>
                <button className='btn btn-outline-light my-1' id='TechStatus' onClick={()=>navigate('/addcomponent')} >Add Component</button>
               </div>
          <div class="d-grid gap-2">
            <div>
              <table className="table" style={{ color: '#ffffff' }}>
                <thead>
                  <tr className="text-center">
                    <th scope="col">Id</th>
                    <th scope="col">Component Name</th>
                    <th scope="col">Component Company</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Requried Date </th>
                    <th scope="col">InStock </th>
                    <th scope="col">Technician Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((value, index1) => (
                    <tr key={index1} className="text-center" >
                      <td>{value.componentId}</td>
                      <td>{value.componentTitle}</td>
                      <td>{value.requestingCompany}</td>
                      <td>{value.qty}</td>
                      <td>{value.requiredDate}</td>
                      <td>{value.inStock}</td>
                      <td>{value.id.name}</td>
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
                  <h5 className="modal-title mx-2" id="exampleModalLabel">User Details</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body" >
                  <table className="mx-4">
                    <tr>
                      <th className="mx-2">Id :</th>
                      <th>{data[index]?.componentId}</th>
                    </tr>
                    <tr>
                      <th >Component Name: </th>
                      <th>{data[index]?.componentTitle}</th>
                    </tr>
                    <tr>
                      <th >Component Company: </th>
                      <th>{data[index]?.requestingCompany}</th>
                    </tr>
                    <tr>
                      <th >Description: </th>
                      <th>{data[index]?.description}</th>
                    </tr>
                    <tr>
                      <th >Quantity: </th>
                      <th>{data[index]?.qty}</th>
                    </tr>
                    <tr>
                      <th >In Stock: </th>
                      <th>{data[index]?.inStock}</th>
                    </tr>
                    <tr>
                      <th >Required date: </th>
                      <th>{data[index]?.requiredDate}</th>
                    </tr>
                    <tr>
                      <th >Price: </th>
                      <th>{data[index]?.price}</th>
                    </tr>
                    <tr>
                      <th >Technician: </th>
                      <th>{data[index]?.name}</th>
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
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>





    </section>

  )
}

export default ComponentsList