import axios from "axios";
import { GET_PRODUCTS, FILTER_PRODUCTS, SEARCH_PRODUCT } from "./types";

export function getProducts(){
    const request = axios.get('api/product/getProducts')
        .then(response => {
            if (!response.data.success) {
                return (response.data)
            }
            response.data.productList.sort((a,b) => (a.continents > b.continents) ?
                1 : ((b.continents > a.continents) ? -1 : 0));
            return ({...response.data, productToRender: response.data.productList});
        } );

    return {
        type: GET_PRODUCTS,
        payload: request
    }
}

export function filterProducts(productList, searchList, price){
    let filteredList = productList.filter(item => searchList.includes(parseInt(item.continents)));

    if (filteredList.length === 0) {
        filteredList = productList;
    }

    if (price > 1) {
        let priceList;
        priceList = filteredList.filter(product => product.price < price);
        filteredList = priceList;
    }

    return {
        type: FILTER_PRODUCTS,
        payload: {
            productList: productList,
            productToRender: filteredList
        }
    }
}

export function searchProduct(productList, value){
    let searched = productList.filter(product => !product.title.toUpperCase().search(value));
    if (value === " ") {
        searched = productList;
    }

    return {
        type: SEARCH_PRODUCT,
        payload: {
            productList: productList,
            productToRender: searched
        }
    }
}