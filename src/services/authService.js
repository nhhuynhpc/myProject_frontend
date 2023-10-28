import API_URL from "./constants";
import axios from "axios";

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

export {

    userRegister,
    userLogin,
    getUser,
}