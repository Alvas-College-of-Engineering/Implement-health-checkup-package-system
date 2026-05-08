import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

API.interceptors.response.use(
  res => res,
  err => {
    const msg = err?.response?.data?.message || err?.message || 'Something went wrong';
    return Promise.reject(new Error(msg));
  }
);

export const packageApi = {
  getAll:  ()      => API.get('/packages'),
  getById: (id)    => API.get(`/packages/${id}`),
};

export const patientApi = {
  getAll:  ()               => API.get('/patients'),
  book:    (pkgId, data)    => API.post(`/patients/book/${pkgId}`, data),
  cancel:  (id)             => API.patch(`/patients/${id}/cancel`),
  delete:  (id)             => API.delete(`/patients/${id}`),
};
