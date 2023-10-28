import API_URL from "./constants";
import axios from "axios";

// title

const getTitle = () => {
    return axios.get(API_URL + '/title')
}

export {
    getTitle
}