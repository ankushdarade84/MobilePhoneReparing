export const SET_LOGINID = 'SET_LOGINID';
export const SET_USER_TYPE='SET_USER_TYPE';
export const SET_LOGGEDIN='SET_LOGGEDIN';
export const setLoginId = loginId => dispatch => {
    dispatch({
        type: SET_LOGINID,
        payload: loginId
    })
};
export const setUserType = userType => dispatch => {
    dispatch({
        type: SET_USER_TYPE,
        payload: userType
    })
};
export const setLoggedIn = LoggedIn => dispatch => {
    dispatch({
        type: SET_LOGGEDIN,
        payload: LoggedIn
    })
};

