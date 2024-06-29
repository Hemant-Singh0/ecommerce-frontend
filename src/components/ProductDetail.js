import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import Header from './Header';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector(state => state.product.productDetails);

    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch, id]);

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className="product-detail-container">
                <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <p>Category: {product.category}</p>
                <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </>
    );
};

export default ProductDetail;
