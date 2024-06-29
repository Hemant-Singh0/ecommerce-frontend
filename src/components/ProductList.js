import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts, deleteProduct } from '../actions/productActions';
import { getUser } from '../actions/userActions';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EditProductForm from './EditProductForm';
import Header from './Header';

const ProductList = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.product.productList);
    const { userInfo } = useSelector(state => state.user);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        dispatch(listProducts());
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(getUser(token));
        }
    }, [dispatch]);

    useEffect(() => {
        setFilteredProducts(productList);
    }, [productList]);

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setShowEditForm(true);
    };

    const handleDelete = (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        dispatch(deleteProduct(selectedProduct._id));
        setShowDeleteModal(false);
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = productList.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.price.toString().includes(query)
        );
        setFilteredProducts(filtered);
    };

    return (
        <>
            <Header />
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name, category, or price"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <div className="product-list-container">
                {filteredProducts.length === 0 ? (
                    <div className="no-data">No data found</div>
                ) : (
                    filteredProducts.map(product => (
                        <div key={product._id} className="product-card">
                            <Link to={`/product/${product._id}`}>
                                <img src={product.imageUrl} alt={product.name} className="product-image" />
                            </Link>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                            {userInfo?.isAdmin && (
                                <div className="admin-controls">
                                    <button className="edit-button" onClick={() => handleEdit(product)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDelete(product)}>Delete</button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
            <DeleteConfirmationModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
            />
            {showEditForm && (
                <EditProductForm
                    product={selectedProduct}
                    onClose={() => setShowEditForm(false)}
                />
            )}
        </>
    );
};

export default ProductList;

