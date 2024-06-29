import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_GET_ITEMS } from '../constants/cartConstants';
import BASE_URL from '../config';
import { toast } from 'react-toastify';

export const getCart = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        }

        const { data } = await axios.get(`${BASE_URL}/api/cart`, config);
        if(data){
            dispatch({ type: CART_GET_ITEMS, payload: data });
        }
    } catch (error) {
        console.error(error);
    }
};

export const addToCart = (product) => async (dispatch) => {
    try {
        let userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        }
        const cartItem = {
            productId: product._id,
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: 1,
            userId: userId
        };
        const { data } = await axios.post(`${BASE_URL}/api/cart`, cartItem, config);
        dispatch({ type: CART_ADD_ITEM, payload: data });
        toast.success('Item added to cart successfully!');
        dispatch(getCart());
    } catch (error) {
        console.error(error);
    }
};

export const removeFromCart = (productId) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        await axios.delete(`${BASE_URL}/api/cart/${productId}`, config);
        dispatch({ type: CART_REMOVE_ITEM, payload: productId });
        toast.success('Item removed from cart successfully!');
        dispatch(getCart());
    } catch (error) {
        console.error(error);
    }
};