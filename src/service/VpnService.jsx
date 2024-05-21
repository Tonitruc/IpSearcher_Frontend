import axios from "axios";
const apiUrl = 'https://ipsearcher.onrender.com';

export const listVpns = () =>  axios.get(`${apiUrl}/api/vpn/all`);

export const getVpnById = (id) =>  axios.get(`${apiUrl}/api/vpn/get/` + id);

export const addVpn = (vpn) =>  axios.post(`${apiUrl}/api/vpn/` + "add_with_exist_ip", vpn);

export const updateVpn = (id, vpn) => axios.put(`${apiUrl}/api/vpn/` + "update?id=" + id, vpn);

export const deleteVpn = (id) => axios.delete(`${apiUrl}/api/vpn/` + "delete/" + id); 

export const removeIp = (id, ip) => axios.put(`${apiUrl}/api/vpn/remove_ip/${id}?ip=${ip}`);

export const addIP = (id, ip) => axios.put(`${apiUrl}/api/vpn/add_ip/${id}?ip=${ip}`);
