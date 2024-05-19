import axios from "axios";
import dotenv from 'dotenv';

//const apiUrl = process.env.VUE_APP_API_URL
const apiUrl = 'https://ipsearcher.onrender.com/api'; //член

export const listVpns = () =>  axios.get(`${apiUrl}/vpn/all`);

export const getVpnById = (id) =>  axios.get(`${apiUrl}/vpn/get/` + id);

export const addVpn = (vpn) =>  axios.post(`${apiUrl}/vpn/` + "add_with_exist_ip", vpn);

export const updateVpn = (id, vpn) => axios.put(`${apiUrl}/vpn/` + "update?id=" + id, vpn); 