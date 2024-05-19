import axios from "axios";

const REST_API_BASE_URL = "https://ipsearcher.onrender.com/api/server_traffics/all"

export const serverTrafficsList = () =>  axios.get('https://ipsearcher.onrender.com/api/server_traffic/all');