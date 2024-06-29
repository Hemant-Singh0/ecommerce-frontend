import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../actions/productActions';
import Header from "./Header"

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        if (!name) tempErrors.name = 'Name is required';
        if (!description) tempErrors.description = 'Description is required';
        if (!price) tempErrors.price = 'Price is required';
        else if (price <= 0) tempErrors.price = 'Price must be greater than zero';
        if (!category) tempErrors.category = 'Category is required';
        if (!imageUrl) tempErrors.imageUrl = 'Image URL is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleInputChange = (setter, field) => (e) => {
        setter(e.target.value);
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const productData = {
                name,
                description,
                price,
                category,
                imageUrl
            };
            dispatch(addProduct(productData, navigate));
        }
    };

    return (
        <>
        <Header/>
        <div className="add-product-container">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleInputChange(setName, 'name')}
                    />
                    {errors.name && <div className="error">{errors.name}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={handleInputChange(setDescription, 'description')}
                    />
                    {errors.description && <div className="error">{errors.description}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={handleInputChange(setPrice, 'price')}
                    />
                    {errors.price && <div className="error">{errors.price}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={handleInputChange(setCategory, 'category')}
                    />
                    {errors.category && <div className="error">{errors.category}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="text"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={handleInputChange(setImageUrl, 'imageUrl')}
                    />
                    {errors.imageUrl && <div className="error">{errors.imageUrl}</div>}
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
        </>
    );
};

export default AddProduct;
