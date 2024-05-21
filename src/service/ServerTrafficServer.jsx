import axios from "axios";
const apiUrl = 'https://ipsearcher.onrender.com';

export const serverTrafficsList = () =>  axios.get(`${apiUrl}/api/server_traffic/all`);

export const addServerTraffic = async (trafficName) => {
    try {
        const response = await axios.post(`${apiUrl}/api/server_traffics/add`, trafficName);
        return response.data;
    } catch (error) {
        console.error('Error adding server traffic:', error);
        throw error; 
    }
};