import axios from 'axios';

import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_CART_TO_USER,
    ADD_PAYMENT_TO_USER
} from './types';

export function loginUser(dataToSubmit) {
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)
    return{
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => {
            return response.data;
        });
    return{
        type: REGISTER_USER,
        payload: request
    }
}

export function AuthPage() {
    const request = axios.get('/api/users/auth')
        .then(response => response.data)
    return{
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get('/api/users/logout')
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function makeUserCart(productId, userInfo){
    let cart;
    if (userInfo.cart && userInfo.cart.length > 0){
        cart = [...userInfo.cart];
        const cartList = userInfo.cart.filter( product => product.productId === productId);
         if (cartList.length === 0) {
             cart.push({productId: productId, quantity: 1})
         } else {
             for (let product of cart) {
                 if (product.productId === productId) {
                     product.quantity ++;
                     break;
                 }
             }
         }
    } else {
        cart = [{productId: productId, quantity: 1}];
    }
    const request = axios.post(`/api/users/cartPage?id=${productId}`, cart)
        .then(response => {
          return (response.data);
        } );

    return {
        type: ADD_CART_TO_USER,
        payload: request
    }
}

export function deleteFromCart(productId, cartList){
    let cart = cartList.filter( product => product.productId !== productId);

    const request = axios.post(`/api/users/cartPage?id=${productId}`, cart)
        .then(response => {
            return (response.data);
        } );

    return {
        type: ADD_CART_TO_USER,
        payload: request
    }
}

export function incOrDecFromCart(productId, cartList, increment){
    let cart = [...cartList];
    for (let product of cart) {
        if (product.productId === productId) {
            if(increment){
                product.quantity ++;
                break;
            }
            product.quantity --;
            break;
        }
    }
    const request = axios.post(`/api/users/cartPage?id=${productId}`, cart)
        .then(response => {
            return (response.data);
        } );
    return {
        type: ADD_CART_TO_USER,
        payload: request
    }
}

export function successPay(variable){
    const request = axios.post(`/api/users/transaction`, variable)
        .then(response => {
            return (response.data);
        } );
    return {
        type: ADD_PAYMENT_TO_USER,
        payload: request
    }
}