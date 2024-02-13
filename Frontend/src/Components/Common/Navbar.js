import React from 'react'

import { setLoggedIn, setLoginId, setUserType } from '../../Redux/Actions/UserActions';
import { useSelector, useDispatch } from 'react-redux';
function Navbar() {

    const dispatch = useDispatch();
    const logout = () => {
        localStorage.clear();
        dispatch(setLoggedIn(false));
        dispatch(setLoginId(0));
        dispatch(setUserType(''));
    }
    const { loggedIn, userType } = useSelector((store) => store.UserReducer);

    return (
        loggedIn ?
            userType === 'user' ?
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand"href >Mobo Quick</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <a class="nav-link" href='/ticketlist'>Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/sendticket">Add Ticket</a>
                            </li>
                            {loggedIn ? <li class="nav-item ms-5">
                                <a class="nav-link" href onClick={() => logout()}>Logout</a>
                            </li> : <></>}

                        </ul>
                    </div>
                </nav> :
                userType === 'technician' ?
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <a class="navbar-brand" href>Mobo Quick</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item active">
                                    <a class="nav-link" href='/ticketlist'>Home <span class="sr-only">(current)</span></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/addcomponent">Add component</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/componentlist">Component List</a>
                                </li>
                                <li class="nav-item ms-5">
                                    <a class="nav-link" href onClick={() => logout()}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </nav> :
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <a class="navbar-brand" href >Mobo Quick</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                                <li class="nav-item active">
                                    <a class="nav-link" href='/admin'>Home <span class="sr-only">(current)</span></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/componentlist">Component List</a>
                                </li>
                             
                                <li class="nav-item">
                                    <a class="nav-link" href="/techlist">Technician List</a>
                                </li>
                              
                                <li class="nav-item">
                                    <a class="nav-link" href="/ticketlist">Ticket List</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/customerlist">Customer List</a>
                                </li>
                                <li class="nav-item ms-5">
                                    <a class="nav-link" href onClick={() => logout()}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </nav> :
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href >Mobo Quick</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href='/ticketlist'>Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/aboutus">About us</a>
                        </li>

                    </ul>
                </div>
            </nav>


    )
}

export default Navbar