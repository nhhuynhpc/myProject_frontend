import API_URL from "./constants";
import axios from "axios";

// title

const getTitle = () => {
    return axios.get(API_URL + '/auth/title')
}

// user

const userLogin = (data) => {
    return axios.post(API_URL + '/auth/login', data)
}

const userRegister = (data) => {
    return axios.post(API_URL + '/auth/register', data)
}

const getUser = (token) => {
    return  axios.get(API_URL + '/user-detail', {headers: { Authorization: 'Bearer ' + token}})
    .then((result) => result)
    .catch((err) => console.log(err))
}

// categories

const PostimgCate = (dataimg) => {
    return axios.post(API_URL + '/auth/categories/upload', dataimg)
}

const GetCategories = () => {
    return axios.get(API_URL + '/auth/categories')
}

const GetListCategories = () => {
    return axios.get(API_URL + '/auth/categories-and-detail')
}

const GetListCategoriesDetail = () => {
    return axios.get(API_URL + '/auth/categories-detail')
}

const PostListCategories = (dataCate) => {
    return axios.post(API_URL + '/auth/categories-detail', dataCate)
}

const PostUpdateCategories = (dataCate) => {
    return axios.post(API_URL + '/auth/categories-detail/update', dataCate)
}

const PostDeleteCategories = (dataCate) => {
    return axios.post(API_URL + '/auth/categories-detail/delete', dataCate)
}

const FetchCateWithSlug = (data) => {
    return axios.post(API_URL + '/auth/categories/detail-with-slug', data)
}

// product

const Postimg = (dataimg) => {
    return axios.post(API_URL + '/auth/upload', dataimg)
}

const PostProduct = (data) => {
    return axios.post(API_URL + '/auth/product/create', data)
}

const GetProduct = () => {
    return  axios.get(API_URL + '/auth/product')
}

const UpdateProduct = (data) => {
    return axios.post(API_URL + '/auth/product/update', data)
}

const DeleteProduct = (data) => {
    return axios.post(API_URL + '/auth/product/delete', data)
}

const SearchProduct = (data) => {
    return axios.post(API_URL + '/auth/product/search', data)
}

const getProductDetail = (data) => {
    return axios.post(API_URL + '/auth/product/product-detail', data)
}

const GetCustomerObject = () => {
    return axios.get(API_URL + '/auth/customers-object')
}

const GetProductByCustomer = (data) => {
    return axios.post(API_URL + '/auth/product/group-products-by-customer', data)
}

// carts
const PostCarts = (data) => {
    return axios.post(API_URL + '/auth/cart', data)
}

const PostCartsDetail = (data) => {
    return axios.post(API_URL + '/auth/cart-detail', data)
}

const GetProductInCart = (data) => {
    return axios.post(API_URL + '/auth/cart/get-product', data)
}

const DeleteProductInCart = (data) => {
    return axios.post(API_URL + '/auth/cart-detail/delete', data)
}

// Search
const GetProductSearched = (data) => {
    return axios.post(API_URL + '/auth/search', data)
}

export {
    getTitle,
    GetProductSearched,

    userRegister,
    userLogin,
    getUser,

    PostimgCate,
    GetCategories,
    GetListCategoriesDetail,
    PostListCategories,
    GetListCategories,
    PostUpdateCategories,
    PostDeleteCategories,
    FetchCateWithSlug,

    Postimg,
    PostProduct,
    GetProduct,
    UpdateProduct,
    DeleteProduct,
    SearchProduct,
    getProductDetail,
    GetProductByCustomer,

    GetCustomerObject,

    PostCarts,

    PostCartsDetail,
    DeleteProductInCart,

    GetProductInCart,
}