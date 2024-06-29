import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { useDispatch } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa'
import { getCart } from '../actions/cartActions';

const Header = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.user);
    const cart = useSelector(state => state.cart.cart);

    const handleLogout = () => {
        dispatch(logout());
        window.location.reload();
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(getCart());
        }
    }, [dispatch,userInfo]);

    const cartItemCount = userInfo ? cart?.cartItems?.reduce((acc, item) => acc + item.quantity, 0) : 0;

    return (
        <header className="header">
            <div className="user-cart">
                {userInfo ? (
                    <div className="user-info">
                        <span ><Link to="/" className="welcome-message">Welcome, {userInfo.name}</Link>
                        </span><Link to="/cart" className="cart-icon">
                            <FaShoppingCart className="cart-icon" />
                            {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
                        </Link>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                        {userInfo.isAdmin && (
                            <Link to="/add-product" className="add-product-button">Add Product</Link>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="login-button">Login</Link>
                )}

            </div>
        </header>
    );
};

export default Header;
