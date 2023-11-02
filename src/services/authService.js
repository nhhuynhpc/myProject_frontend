import API_URL from './constants';
import axios from 'axios';

// user

const userLogin = (data) => {
    return axios.post(API_URL + '/auth/login', data);
};

const userRegister = (data) => {
    return axios.post(API_URL + '/auth/register', data);
};

const getUser = (data, token) => {
    return axios
        .post(API_URL + '/auth/data', data, {
            headers: { Authorization: 'Bearer ' + token },
        })
        .catch((err) => console.log(err));
};

const getUserById = async (data, token) => {
    return axios
        .post(API_URL + '/auth/user-detail', data, {
            headers: { Authorization: 'Bearer ' + token },
        })
        .then((result) => result)
        .catch((err) => console.log(err));
};

const postUpdateUser = (data, token) => {
    return axios
        .post(API_URL + '/auth/update', data, {
            headers: { Authorization: 'Bearer ' + token },
        })
        .catch((err) => console.log(err));
};

const postDeleteUser = (data, token) => {
    return axios
        .post(API_URL + '/auth/delete', data, {
            headers: { Authorization: 'Bearer ' + token },
        })
        .catch((err) => console.log(err));
};

const postUpdateDataUserById = (data, token) => {
    return axios.post(API_URL + '/auth/update-by-id', data, {
        headers: { Authorization: 'Bearer ' + token },
    }).catch((err) => console.log(err))
};

const postUpdateDataPasswordById = (data, token) => {
    console.log(token);
    return axios.post(API_URL + '/auth/update-password-by-id', data, {
        headers: { Authorization: 'Bearer ' + token },
    }).catch((err) => console.log(err))
};

export {
    userRegister,
    userLogin,
    getUserById,
    getUser,
    postUpdateUser,
    postDeleteUser,
    postUpdateDataUserById,
    postUpdateDataPasswordById,
};
