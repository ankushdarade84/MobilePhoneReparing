import { SET_LOGINID, SET_USER_TYPE, SET_LOGGEDIN } from "../Actions/UserActions";

const initialState = {
    loginId: localStorage.getItem('loginId'),
    userType: localStorage.getItem('userType') ,
    loggedIn: localStorage.getItem('loggedIn')
};
function UserReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOGINID:
            return { ...state, loginId: action.payload };
        case SET_USER_TYPE:
            return { ...state, userType: action.payload };
        case SET_LOGGEDIN:
            return { ...state, loggedIn: action.payload };
        default:
            return state;
    }
}


export const getalldatalocalStroge = () => {
    console.log("vllo");
    return dispatch => {
        dispatch({ type: SET_LOGGEDIN, payload: localStorage.getItem('loggedIn') });
        dispatch({ type: SET_LOGINID, payload: localStorage.getItem('loginId') });
        dispatch({ type: SET_USER_TYPE, payload: localStorage.getItem('userType') })
    };

}


export default UserReducer;