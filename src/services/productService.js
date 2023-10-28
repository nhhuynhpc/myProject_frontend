import API_URL from "./constants";
import axios from "axios";

// product

const Postimg = (dataimg) => {
    return axios.post(API_URL + '/product/upload', dataimg)
}

const PostProduct = (data) => {
    return axios.post(API_URL + '/product/create', data)
}

const GetProduct = () => {
    return  axios.get(API_URL + '/product')
}

const UpdateProduct = (data) => {
    return axios.post(API_URL + '/product/update', data)
}

const DeleteProduct = (data) => {
    return axios.post(API_URL + '/product/delete', data)
}

const SearchProduct = (data) => {
    return axios.post(API_URL + '/product/search', data)
}

const getProductDetail = (data) => {
    return axios.post(API_URL + '/product/product-detail', data)
}

const GetCustomerObject = () => {
    return axios.get(API_URL + '/product/customers-object')
}

const GetProductByCustomer = (data) => {
    return axios.post(API_URL + '/product/group-products-by-customer', data)
}

export {
    Postimg,
    PostProduct,
    GetProduct,
    UpdateProduct,
    DeleteProduct,
    SearchProduct,
    getProductDetail,
    GetProductByCustomer,

    GetCustomerObject,
}