import React, { useEffect, useState } from 'react'

import "../Common/TicketList.css";
import axios from 'axios';
import { useSelector ,useDispatch} from 'react-redux';
import { getalldatalocalStroge } from '../../Redux/Reducer/UserReducer';


function TicketList() {
    const dispatch=useDispatch();
    const {loginId,userType } = useSelector((store) => store.UserReducer);
    const [data, setData] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [response, setReponse] = useState('');
    const [rowData, setRowData] = useState();
    const [newData, setnewData] = useState([]);
    const [components, setComponents] = useState([]);
    const [status, setStatus] = useState("ALL");
    const [edit, setEdit] = useState(true);
    const [saved, setSaved] = useState(false);
    const [techstatus, setTechstatus] = useState('Active');
    const getTickedByTechId = () => {
        console.log("getTickedByTechId");
        axios.get(`http://localhost:8000/getticketbytechnicainid/${loginId}`)
            .then((response) => {
                setData(response.data);
                getTechStatus(loginId);

            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    };
    const getTickedByUserId = () => {
        console.log("getTickedByUserId");
        axios.get(`http://localhost:8000/getticketbyuserid/${loginId}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    };
    const getallTicket=()=>{
        console.log("getallTicket");
        axios.get(`http://localhost:8000/getallticket`)
        .then((response) => {
            setData(response.data);
            getComponents();
        })
        .catch((error) => {
            console.log(error);
            alert(error);
        });
    }
    const getComponents = () => {
        axios.get('http://localhost:8000/getallcomponent')
            .then((response) => {
                setComponents(response.data.Components);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    };

    useEffect(() => {
        dispatch(getalldatalocalStroge());
        if(userType==="technician"){
            getTickedByTechId();
        }
        else{if(userType==="user"){
            getTickedByUserId();
        }
        else{
            getallTicket();
        }

        }
   
        setSaved(false);
    }, [saved]);
 
    const UpdateTicket = (id) => {

        axios.put(`http://localhost:8000/updateticket/${id}`, {
            mobileCompany: rowData.mobileCompany, mobileModel: rowData.mobileModel, problemDescription: rowData.problemDescription, response: response, componentId: checkedItemIds
        })
            .then((response) => {
                getTickedByTechId();
                setSaved(true);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    };

    const UpdateStatusClosed = (id) => {
        axios.put(`http://localhost:8000/updateticketstatus/${id}/Closed`)
            .then((response) => {
                setSaved(true);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    };
    const getTechStatus = (id) => {
        console.log("id",id);
        axios.get(`http://localhost:8000/gettechstatus/${id}`)
            .then((response) => {
                setTechstatus(response.data);
                getComponents();
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }
    const setStatusApi = (id, status) => {
        axios.put(`http://localhost:8000/updatetechstatus/${id}/${status}`)
            .then((response) => {
                console.log("Updated status success");
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }
    const handleRowData = (value) => {
        setRowData(value);
        let data = value.componentId;
        if (data !== '') {
            let componentList = [];
            data.map((item) => (componentList.push(item.componentId)));
            components.map((item) => { componentList.includes(item.componentId) ? setCheckedItems(prevState => ({ ...prevState, [item.componentId]: true })) : setCheckedItems(prevState => ({ ...prevState, [item.componentId]: false })) });
            setReponse(value.response);
        }
    }
    function handleCheckboxChange(event) {
        const { value, checked } = event.target;
        setCheckedItems(prevState => ({ ...prevState, [value]: checked }));
    }

    const checkedItemIds = Object.keys(checkedItems)
        .filter(key => checkedItems[key])
        .map(Number);

    function filter(key) {
        setnewData(data.filter((item) =>
            (item.status.toLowerCase().includes(key.toLowerCase()))));
    }


    return (
        <section className="background-radial-gradient overflow-hidden" style={{ color: 'White' }}>
            <div class="container px-2 py-3 px-md-8 text-center text-lg-start" style={{ color: 'hsl(218, 81%, 95%)' }}>
                {userType !== "technician" ?
                    <div></div>:
                   <div style={{ display: 'block', marginLeft: '85%' }}>
                   <label className='mx-3' htmlFor='TechStatus'>Status</label>
                   {techstatus === "Active" ? <button className='btn btn-success' id='TechStatus' onClick={() => { setTechstatus('Inactive'); setStatusApi(loginId, 'InActive') }}>Active</button> : <button id='TechStatus' className="btn btn-danger" onClick={() => { setTechstatus('Active'); setStatusApi(loginId, 'Active') }}>Inactive</button>}
               </div>
                }
                <div className="Container">
                    <h2 className="text-center py-4">Ticket List</h2>
                    <table className="table" >
                        <thead>
                            <tr>
                                <th scope="col">Ticket Id</th>
                                <th scope="col">Mobile Model</th>
                                <th scope="col">Mobile Company</th>
                                <th scope="col">Problem Description</th>
                                <th scope="col">Status <select style={{ border: '1px solid black' }} name="Status" id="Status" onChange={(e) => { setStatus(e.target.value); filter(e.target.value); console.log("s", e.target.value) }}>
                                    <option value="">All</option>
                                    <option value="ALLOCATED">Allocated</option>
                                    <option value="INPROGRESS">Inprogress</option>
                                    <option value="CLOSED">Closed</option>
                                </select>
                                </th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(status !== "ALL" ? newData : data).map((value, index1) => (
                                <tr key={index1}>
                                    <td>{value.ticketId}</td>
                                    <td>{value.mobileModel}</td>
                                    <td>{value.mobileCompany}</td>
                                    <td>{value.problemDescription}</td>
                                    <td>{value.status}</td>
                                    <td>
                                        <button type="button" style={{ marginLeft: "10px" }} className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={() => { handleRowData(value); setEdit(true) }}>View</button>
                                        {userType==="user"?<></>: value.status !== "Closed" ? <button type="button" style={{ marginLeft: "10px" }} onClick={() => { UpdateStatusClosed(value.ticketId); getTickedByTechId() }} className="btn btn-danger">Close</button> : ''}
                                       </td></tr>))}
                        </tbody>
                    </table>
                </div>

            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document" style={{ color: 'hsl(218, 41%, 19%)', }}>
                    <div className="modal-content" style={{ width: '120%' }} >
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ticket Details</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" >
                            <table className='modalTable'>
                                <tbody >
                                    <tr className='modalTableRow'>
                                        <td className='label'>Id</td>
                                        <td className='value'>{rowData?.ticketId}</td>
                                    </tr>
                                    <tr className='modalTableRow'>
                                        <td className='label'>Mobile Model</td>
                                        <td className='value'>{rowData?.mobileModel}</td>
                                    </tr>
                                    <tr>
                                        <td className='label' >Problem Description</td>
                                        <td className='value'>{rowData?.problemDescription}</td>
                                    </tr>
                                    <tr><td className='label'>reg Date</td><td className='value'><p>{new Date(rowData?.regDate).toUTCString()}</p></td></tr>
                                    <tr><td className='label'>Response</td><td className='value'><input value={response} onChange={(e) => { setReponse(e.target.value) }} disabled={edit}
                                    ></input></td></tr>
                                    <tr><td className='label'>Component</td> <td className='value'>{edit ? rowData?.componentId.length === 0 ? 'No component used' :
                                        <table className='componentTable'>
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Title</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>{rowData?.componentId.map((item) => (
                                                <tr>
                                                    <td>{item?.componentId}</td>
                                                    <td>{item?.componentTitle}</td>
                                                    <td>{item?.mobileCompany}</td>
                                                    <td>{item?.price}</td></tr>))}
                                            </tbody>
                                        </table> : components.map((component) => (<><input type="checkbox"
                                            value={component.componentId}
                                            checked={checkedItems[component.componentId]}
                                            onChange={handleCheckboxChange} id={component.componentId}></input><label htmlFor=''>{component.componentId} - {component.componentTitle} - ₹{component.price} - {component.inStock}</label><br></br></>))}
                                    </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                        {userType==="user"?<></>:rowData?.status !== "Closed" ?
                                <button type="button" className="btn btn-success" onClick={() => setEdit(false)}>Edit</button> : ''}

                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            {userType==="user"?<></>:
                            <button type="button" onClick={() => {
                                UpdateTicket(rowData.ticketId)
                            }} className="btn btn-primary" data-dismiss="modal">Save changes</button>}
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </section>
    )
}


export default TicketList