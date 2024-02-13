import React from 'react'
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
function PrivateRoute() {
    const { loggedIn, userType } = useSelector((store) => store.UserReducer);
  return (

        loggedIn? <Outlet/>:<Navigate to="/" replace={true} />
  )
}

export default PrivateRoute