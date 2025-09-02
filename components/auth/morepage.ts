// src/api/index.js
import axios from 'axios'

const BASE_URL = 'https://denchinfotech.in/react/admin/api'

export const getContactDetails = async () => {
    return axios.get(`${BASE_URL}/contact`);
};

export const getQuoteDetails = async () => {
    return axios.get(`${BASE_URL}/get-quote`);
};
export const getWhyUsDetails = async () => {
    return axios.get(`${BASE_URL}/why-us`);
};
export const getCareerDetails = async () => {
    return axios.get(`${BASE_URL}/get-career`);
};
export const getPolicyDetails = async () => {
    return axios.get(`${BASE_URL}/privacy-policy`);
};
