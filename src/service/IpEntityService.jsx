import axios from "axios";
const apiUrl = 'https://ipsearcher.onrender.com';

export const getIpEntity = (ip) => {
    const url = `${apiUrl}/api/ip/search?ip=${ip}`;
    
    return axios.post(url)
    .then(response => {
        const data = response.data;
        return data;
    })
    .catch(error => {
        console.error("Error fetching IP info:", error);
        throw error; 
    });
};

export const addIpWithTraffic = (ip, id) => {
    const url = `${apiUrl}/api/ip/ip_with_traffic`;

    const ipEntityRequest = {query: ip, serverTrafficId: id};
    return axios.post(url, ipEntityRequest).then(response => {
        const data = response.data;
        return data;
    })
    .catch(error => {
        console.error("Error fetching IP info with traffic:", error);
        throw error; 
    });
}
