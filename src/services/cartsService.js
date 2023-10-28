import API_URL from "./constants";
import axios from "axios";

// carts
const PostCarts = (data) => {
    return axios.post(API_URL + '/cart', data)
}

const GetProductInCart = (data) => {
    return axios.post(API_URL + '/cart/get-product', data)
}

export {
    PostCarts,
    GetProductInCart,
}