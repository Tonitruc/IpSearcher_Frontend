import axios from "axios";

export const getIpEntity = (ip) => {
    const url = 'http://localhost:8080/api/ip/search/?ip=${ip}';
    
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
