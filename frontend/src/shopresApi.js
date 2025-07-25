import axios from 'axios';

const shopresApi = axios.create({
  baseURL: 'http://localhost:9090/api/shops',  // adjust to actual endpoint
});

export default shopresApi;
