import API_URL from "./constants";
import axios from "axios";

// cart detail

const PostAddCartDetail = (data) => {
    return axios.post(API_URL + '/cart-detail/add', data)
}

const PostUpdateCartsDetail = (data) => {
    return axios.post(API_URL + '/cart-detail/update', data)
}

const DeleteProductInCart = (data) => {
    return axios.post(API_URL + '/cart-detail/delete', data)
}

export {
    PostAddCartDetail,
    PostUpdateCartsDetail,
    DeleteProductInCart,
}