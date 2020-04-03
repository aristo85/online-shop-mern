import {
    FILTER_PRODUCTS,
    GET_PRODUCTS,
    SEARCH_PRODUCT
} from '../actions/types';

export default function (state = {
    productDb:{
        productList: [],
        productToRender: []
    }}, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return { ...state, productDb: action.payload};

        case FILTER_PRODUCTS:
            return { ...state, productDb: action.payload};

        case SEARCH_PRODUCT:
            return { ...state, productDb: action.payload};

        default:
            return state;
    }
}