import API_URL from "./constants";
import axios from "axios";

// carts
const PostCarts = (data, token) => {
    if (token) {        
        return axios.post(API_URL + '/cart',data , {headers: { Authorization: 'Bearer ' + token}})
        .catch((err) => console.log(err))
    }
}

const GetProductInCart = (data, token) => {
    if (token) {
        return axios.post(API_URL + '/cart/get-product', data, {headers: { Authorization: 'Bearer ' + token}})
        .catch(err => console.log(err))
    }
}

export {
    PostCarts,
    GetProductInCart,
}