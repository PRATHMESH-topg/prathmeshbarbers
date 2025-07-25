import axios from 'axios';

const imageApi = axios.create({
  baseURL: 'http://localhost:9090/api/images/upload',  // adjust to actual endpoint
});

export default imageApi;
