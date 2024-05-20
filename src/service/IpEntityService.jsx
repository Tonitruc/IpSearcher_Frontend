import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getIpEntity = (ip) => {
    console.log(ip);
    const url = `${apiUrl}/api/ip/search?ip=${ip}`;

    
    return axios.post(url)
    .then(response => {
        const data = response.data;
        return data;
    })
    .catch(error => {
        console.error("Error fetching IP info:", error);
        throw error; // Ensure to propagate the error to the caller
    });
};
