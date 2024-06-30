import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_GET_ITEMS } from '../constants/cartConstants';

const cartFromStorage = { products: [] };
    

export const cartReducer = (state = { cart: cartFromStorage }, action) => {
    switch (action.type) {
        case CART_GET_ITEMS:
            return { ...state, cart: action.payload };
        case CART_ADD_ITEM:
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    cartItems: state.cart.cartItems.filter(item => item.product !== action.payload)
                }
            };
        default:
            return state;
    }
};
