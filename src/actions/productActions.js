import axios from 'axios';
import { PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_SUCCESS, PRODUCT_ADD_SUCCESS, PRODUCT_DELETE_SUCCESS, PRODUCT_UPDATE_SUCCESS } from '../constants/productConstants';
import BASE_URL from '../config';
import { toast } from 'react-toastify';

export const listProducts = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/products`);
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        console.error(error);
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        console.error(error);
    }
};

export const addProduct = (productData, navigate) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        }

        const { data } = await axios.post(`${BASE_URL}/api/products/`, productData, config);
        dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data });
        navigate('/');
    } catch (error) {
        console.error('Error adding product:', error);
    }
};

export const deleteProduct = (productId) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        }
        await axios.delete(`${BASE_URL}/api/products/${productId}`, config);
        dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: productId });
        toast.success('Product deleted successfully');
        dispatch(listProducts());
    } catch (error) {
        toast.error(error.message);
    }
};

export const updateProduct = (product) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        }
        const { data } = await axios.put(`${BASE_URL}/api/products/${product._id}`, product, config);
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
        toast.success('Product updated successfully');
        dispatch(listProducts());
    } catch (error) {
        dispatch({ type: 'PRODUCT_UPDATE_FAIL', payload: error.message });
        toast.error(error.message);
    }
};

