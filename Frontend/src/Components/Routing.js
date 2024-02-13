import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { Login } from '../Components/Login';
import { SignUp } from '../Components/SignUp';
import SendTicket from "../Components/Customer/SendTicket";

import Admin from "../Components/Admin/Admin";
import AddTechnicians from "../Components/Technicians/AddTechnicians";
import AddCustomer from "../Components/Customer/AddCustomer";
import CustomerList from "../Components/Customer/CustomerList";
import AddComponent from "../Components/MobileComponent/AddComponent"
import ComponentsList from "../Components/MobileComponent/ListComponents";

import TicketList from "../Components/Common/TicketList";

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Navbar from './Common/Navbar';
import Classtest from './Common/classtest';
import { setLoggedIn, setLoginId, setUserType } from '../Redux/Actions/UserActions';
import PrivateRoute from './PrivateRoute';
import { getalldatalocalStroge } from '../Redux/Reducer/UserReducer';
import AboutUs from './DefaultPages/AboutUs';

function Routing() {
    const dispatch = useDispatch();
    const { loggedIn, userType } = useSelector((store) => store.UserReducer);

    return (

        <BrowserRouter>

            <Routes>
                <Route element={<PrivateRoute />}>
                {
                    userType === 'user' ?
                        <>
                            <Route path="/ticketlist" element={<TicketList />} exact />
                            <Route exact path="/sendticket" element={<SendTicket />}></Route>
                        </>

                        :
                        userType === 'technician' ?
                        <>
                        <Route exact path="/ticketlist" element={<TicketList />}></Route>
                        <Route exact path="/addcomponent" element={<AddComponent />}></Route>
                        <Route exact path="/componentlist" element={<ComponentsList />}></Route>
                    </>:
                            <>
                                <Route exact path="/ticketlist" element={<TicketList />}></Route>
                                <Route exact path="/techlist" element={<Admin />}></Route>
                                <Route exact path="/addtech" element={<AddTechnicians />}></Route>
                                <Route exact path="/addcustomer" element={<AddCustomer />}></Route>
                                <Route exact path="/customerlist" element={<CustomerList />}></Route>
                                <Route exact path="/addcomponent" element={<AddComponent />}></Route>
                                <Route exact path="/componentlist" element={<ComponentsList />}></Route>

                            </>
                            
                         
                }
                
                </Route>
            {   loggedIn? <Route exact path="*" element={<Navigate to="/ticketlist" replace={true} />}></Route>
                : <><Route exact path="/" element={<Login />}></Route>
                <Route exact path="/aboutus" element={<AboutUs/>}></Route>
                <Route exact path="/signup" element={<SignUp />}></Route>
                 <Route exact path="*" element={<Navigate to="/" replace={true} />}></Route>
                 </> } 
            </Routes>


        </BrowserRouter>

    )
}

export default Routing