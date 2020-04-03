import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_CART_TO_USER,
    ADD_PAYMENT_TO_USER
} from '../actions/types';

export default function (state = {
    userData: {isAuth: false}
}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload};

        case REGISTER_USER:
            return { ...state, register: action.payload};

        case AUTH_USER:
            return { ...state, userData: action.payload};

        case ADD_CART_TO_USER:
            return { ...state, userData: {
                ...state.userData, cart: action.payload }};
        case ADD_PAYMENT_TO_USER:
            return { ...state, userData: {
                    ...state.userData, cart: action.payload.cart }};

        case LOGOUT_USER:
            return { ...state };

        default:
            return state;
    }
}