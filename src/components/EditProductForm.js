import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../actions/productActions';

const EditProductForm = ({ product, onClose }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [category, setCategory] = useState(product.category);
    const [imageUrl, setImageUrl] = useState(product.imageUrl);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};
        if (!name.trim()) errors.name = 'Name is required';
        if (!description.trim()) errors.description = 'Description is required';
        if (!price || price <= 0) errors.price = 'Price must be a positive number';
        if (!category.trim()) errors.category = 'Category is required';
        if (!imageUrl.trim()) errors.imageUrl = 'Image URL is required';
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            const updatedProduct = {
                ...product,
                name,
                description,
                price,
                category,
                imageUrl
            };
            dispatch(updateProduct(updatedProduct));
            onClose();
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <div className="error">{errors.name}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {errors.description && <div className="error">{errors.description}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        {errors.price && <div className="error">{errors.price}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <input
                            type="text"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        {errors.category && <div className="error">{errors.category}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageUrl">Image URL</label>
                        <input
                            type="text"
                            id="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                        {errors.imageUrl && <div className="error">{errors.imageUrl}</div>}
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditProductForm;
