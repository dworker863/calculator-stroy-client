import axios from 'axios';
import { IService } from '../commonInterfaces/IService';

export const instance = axios.create({
  baseURL: 'http://192.168.1.5:8000/',
});

export const fetchServices = (): Promise<IService[]> => {
  return instance
    .get('services')
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e.message);
      return e.message;
    });
};

export const postService = (service: IService): Promise<IService> => {
  return instance
    .post('services', service)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e.message);
      return e.message;
    });
};

export const patchService = (fields: any) => {
  return instance
    .patch('services', fields)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
    });
};
