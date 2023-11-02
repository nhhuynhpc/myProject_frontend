import API_URL from "./constants";
import axios from "axios";

// order
const PostAddOrders = (data) => {
    return axios.post(API_URL + '/order/add', data)
}

const GetOrders = (data) => {
    return axios.post(API_URL + '/order/get-data-by-user-id', data)
}

const GetOrdersById = (data) => {
    return axios.post(API_URL + '/order/get-data-by-id', data)
}

const GetOrdersAll = () => {
    return axios.get(API_URL + '/order/all-data')
}

const PostUpdateOrder = (data) => {
    return axios.post(API_URL + '/order/update', data)
}

const PostCancelOrder = (data, token) => {
    return axios.post(API_URL + '/order/cancel-order', data, {headers: {Authorization: 'Bearer ' + token}})
    .catch(err => console.log(err))
}

export {
    PostAddOrders,
    GetOrders,
    GetOrdersAll,
    PostUpdateOrder,
    GetOrdersById,
    PostCancelOrder
}