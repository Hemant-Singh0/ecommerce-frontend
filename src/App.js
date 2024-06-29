// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css';
// import { Provider, useSelector } from 'react-redux';
// import store from './store';
// import AuthForm from './components/AuthForm';
// import ProductList from './components/ProductList';
// import Cart from './components/Cart';
// import './styles/main.css';

// const App = () => {
//   const userInfo = useSelector((state) => state.user.userInfo);
//   return (
//     <Provider store={store}>
//       <Router>
//         <ToastContainer />
//         <Routes>
//           <Route path="/" element={<ProductList />} />
//           {!userInfo && (
//             <>
//               <Route path="/login" element={<AuthForm isLogin />} />
//               <Route path="/register" element={<AuthForm />} />
//             </>
//           )}
//           <Route path="/cart" element={<Cart />} />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </Router>
//     </Provider>
//   );
// };

// export default App;


import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import AuthForm from './components/AuthForm';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './styles/main.css';
import AddProduct from './components/AddProduct';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './actions/userActions';
import ProductDetail from './components/ProductDetail';

const App = () => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { userInfo } = useSelector(state => state.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      dispatch(getUser(token));
    }
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      setIsAdmin(userInfo.isAdmin);
    }
  }, [userInfo]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<AuthForm isLogin />} />
            <Route path="/register" element={<AuthForm />} />
          </>
        ) : (
          <>
            <Route path="/cart" element={<Cart />} />
            {isAdmin && <Route path="/add-product" element={<AddProduct />} />}
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
