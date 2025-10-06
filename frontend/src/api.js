import axios from 'axios';


const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const api = axios.create({ baseURL: BASE, timeout: 12000 });


export const getHeatmap = () => api.get('/heatmap');
export const getLibrary = (params = {}) => api.get('/library', { params });
export const getExperiments = () => api.get('/experiments');
export const postCompare = (ids) => api.post('/compare', { ids });
export const postChat = (payload) => api.post('/chat', payload);


export default api;
