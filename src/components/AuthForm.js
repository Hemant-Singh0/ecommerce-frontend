import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, register } from '../actions/userActions';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/main.css';

const AuthForm = ({ isLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            let userData = {
                email, password
            }
            dispatch(login(userData, navigate));
        } else {
            let userData = {
                name, email, password
            }
            dispatch(register(userData, navigate));
        }
    };

    return (
        <div className="container">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="button">
                    {isLogin ? 'Login' : 'Register'}
                </button>
            </form>
            {isLogin ? 'Not a member?  ' : 'Already have an account  '}
            <Link to={isLogin ? "/register" : "/login"} className="link">
                {isLogin ? 'Signup now' : 'Login here'}
            </Link>
        </div>
    );
};

export default AuthForm;
