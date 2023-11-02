import API_URL from "./constants";
import axios from "axios";

// order detail
const PostAddOrdersDetail = (data) => {
    return axios.post(API_URL + '/order-detail/add', data)
}

const GetDataProductInOrder = (data) => {
    return axios.post(API_URL + '/order-detail/data', data)
}

const PostUpdateOrderDetail = (data) => {
    return axios.post(API_URL + '/order-detail/update', data)
}

const GetDataProductInOrderByOrderId = (data) => {
    return axios.post(API_URL + '/order-detail/data-in-order', data)
}

export {
    PostAddOrdersDetail,
    GetDataProductInOrder,
    PostUpdateOrderDetail,
    GetDataProductInOrderByOrderId, 
}