import API_URL from "./constants";
import axios from "axios";

// Search
const GetProductSearched = (data) => {
    return axios.post(API_URL + '/search', data)
}

export {
    GetProductSearched,
}