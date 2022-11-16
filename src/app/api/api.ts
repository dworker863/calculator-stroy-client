import axios from 'axios';
import { IService } from '../commonInterfaces/IService';
import { IUser } from '../commonInterfaces/IUser';

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
      return e.response.data.message;
    });
};

export const postService = (service: IService): Promise<IService> => {
  return instance
    .post('services', service)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      return e.response.data.message;
    });
};

export const patchService = (fields: any) => {
  return instance
    .patch('services', fields)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      return e.response.data.message;
    });
};

export const registration = (user: IUser): Promise<IUser> => {
  return instance
    .post('auth/registration', user)
    .then((res) => {
      console.log(res);

      return res.data;
    })
    .catch((e) => {
      return e.response.data.message;
    });
};

export const login = (user: {
  phoneNumber: string;
  password: string;
}): Promise<IUser> => {
  return instance
    .post('auth/login', user)
    .then((res) => {
      console.log(res.data);

      localStorage.setItem('token', res.data.token);
      return res.data;
    })
    .catch((e) => {
      return e.response.data.message;
    });
};
