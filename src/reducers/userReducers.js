import { USER_INFO_SUCCESS, USER_LOGIN_SUCCESS, USER_LOGOUT } from '../constants/userConstants';

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

export const userReducer = (state = { userInfo: userInfoFromStorage }, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
        case USER_INFO_SUCCESS:
            return { userInfo: action.payload };
        case USER_LOGOUT:
            return { userInfo: null };
        default:
            return state;
    }
};
