import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const serverTrafficsList = () =>  axios.get(`${apiUrl}/api/server_traffic/all`);

export const addServerTraffic = (trafficName) => axios.post(`${apiUrl}/api/server_traffics/add`, trafficName);