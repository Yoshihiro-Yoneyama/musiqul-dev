import axios from "axios";

const api = axios.create()
api.defaults.baseURL = 'http://localhost:34962';
api.defaults.headers.post['Content-Type'] = 'application/json';

export default api