import axios from 'axios';

const cbackendAPI = axios.create({
  baseURL: 'http://localhost:8080/api/users',  // adjust to actual endpoint
});

export default cbackendAPI;
