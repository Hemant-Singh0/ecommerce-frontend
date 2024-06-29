import axios from 'axios';
import { USER_LOGIN_SUCCESS, USER_LOGOUT, USER_INFO_SUCCESS } from '../constants/userConstants';
import BASE_URL from '../config';
import { toast } from 'react-toastify';

export const register = (userData, navigate) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/api/auth/register`, userData);
        toast.success(data.message);
        navigate('/login');
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
};

export const login = (userData, navigate) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/api/auth/login`, userData);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('userId', data.user._id);
        navigate('/');
        window.location.reload();
    } catch (error) {
        console.error(error);
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    dispatch({ type: USER_LOGOUT });
};

export const getUser = (token) => async (dispatch) => {
    try {
        let userId = localStorage.getItem('userId');
        const { data } = await axios.get(
            `${BASE_URL}/api/auth/${userId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        dispatch({ type: USER_INFO_SUCCESS, payload: data });
    } catch (error) {

    }
};