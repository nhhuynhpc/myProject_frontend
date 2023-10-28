import API_URL from "./constants";
import axios from "axios";

// categories

const PostimgCate = (dataimg) => {
    return axios.post(API_URL + '/categories/upload', dataimg)
}

const GetCategories = () => {
    return axios.get(API_URL + '/categories')
}

const GetListCategories = () => {
    return axios.get(API_URL + '/categories/categories-and-detail')
}

const GetListCategoriesDetail = () => {
    return axios.get(API_URL + '/categories/categories-detail')
}

const PostListCategories = (dataCate) => {
    return axios.post(API_URL + '/categories/categories-detail', dataCate)
}

const PostUpdateCategories = (dataCate) => {
    return axios.post(API_URL + '/categories/categories-detail/update', dataCate)
}

const PostDeleteCategories = (dataCate) => {
    return axios.post(API_URL + '/categories/categories-detail/delete', dataCate)
}

const FetchCateWithSlug = (data) => {
    return axios.post(API_URL + '/categories/detail-with-slug', data)
}

export {
    PostimgCate,
    GetCategories,
    GetListCategoriesDetail,
    PostListCategories,
    GetListCategories,
    PostUpdateCategories,
    PostDeleteCategories,
    FetchCateWithSlug,
}