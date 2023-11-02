import API_URL from "./constants";
import axios from "axios";

// cart detail

const PostAddCartDetail = (data, token) => {
        return axios.post(API_URL + '/cart-detail/add', data, {headers: {Authorization: 'Bearer ' + token}})
        .catch(err => {console.log(err);})
}

const PostUpdateCartsDetail = (data, token) => {
    return axios.post(API_URL + '/cart-detail/update', data, {headers: {Authorization: 'Bearer ' + token}})
    .catch(err => {console.log(err);})
}

const DeleteProductInCart = (data, token) => {
    return axios.post(API_URL + '/cart-detail/delete', data, {headers: {Authorization: 'Bearer ' + token}})
    .catch(err => {console.log(err);})
}

export {
    PostAddCartDetail,
    PostUpdateCartsDetail,
    DeleteProductInCart,
}