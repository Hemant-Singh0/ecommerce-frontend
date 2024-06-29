import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCart, removeFromCart } from '../actions/cartActions';
import { FaTrash } from 'react-icons/fa';
import Header from './Header';

const CartPage = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(getCart());
        }
    }, [dispatch]);

    const handleRemove = (productId) => {
        dispatch(removeFromCart(productId));
    };

    useEffect(() => {
        let totalPrice = 0;
        if (cart?.cartItems?.length) {
            cart.cartItems.forEach(item => {
                totalPrice += item.quantity * item.price;
            });
        }
        setTotalPrice(totalPrice.toFixed(2));
    }, [cart]);

    return (
        <>
            <Header />
            <div className="cart-page">
                {cart.cartItems.length === 0 ? (
                    <div className="no-data">Cart is empty</div>
                ) : (
                    <>
                        <h2>Shopping Cart</h2>
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart?.cartItems?.map((item, index) => (
                                    <tr key={item?.product?._id || index} className="cart-item">
                                        <td>
                                            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                                        </td>
                                        <td>
                                            <div className="cart-item-details">
                                                <h3>{item.name}</h3>
                                            </div>
                                        </td>
                                        <td>${item.price}</td>
                                        <td>
                                            <span className="quantity">{item.quantity}</span>
                                        </td>
                                        <td>${(item.quantity * item.price).toFixed(2)}</td>
                                        <td>
                                            <button onClick={() => handleRemove(item?.product?._id)}><FaTrash /></button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="4" className="total-label">Total Price:</td>
                                    <td>${totalPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </>
    );
};

export default CartPage;

