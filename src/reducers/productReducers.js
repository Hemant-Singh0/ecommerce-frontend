import { PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_SUCCESS, PRODUCT_ADD_SUCCESS, PRODUCT_DELETE_SUCCESS, PRODUCT_UPDATE_SUCCESS } from '../constants/productConstants';

export const productReducer = (state = { productList: [], productDetails: {} }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_SUCCESS:
            return {
                ...state, productList: action.payload
            };
        case PRODUCT_DETAILS_SUCCESS:
            return { ...state, productDetails: action.payload };
        case PRODUCT_ADD_SUCCESS:
            return {
                ...state,
                productList: [...state.productList, action.payload]
            };
        case PRODUCT_DELETE_SUCCESS:
            return {
                ...state,
                productList: state.productList.filter(product => product._id !== action.payload)
            };
        case PRODUCT_UPDATE_SUCCESS:
            return {
                ...state,
                productList: state.productList.map(product =>
                    product._id === action.payload._id ? action.payload : product
                )
            };
        default:
            return state;
    }
};