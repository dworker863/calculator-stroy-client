import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:8000/',
});

export const fetchServices = (): Promise<any> => {
  return instance
    .get('services')
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};
