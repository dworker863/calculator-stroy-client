import axios from 'axios';
import { IService } from '../commonInterfaces/IService';
import { IUser } from '../commonInterfaces/IUser';

export const instance = axios.create({
  baseURL: 'http://192.168.1.3:8000/',
});

export const registration = (user: IUser): Promise<IUser> => {
  return instance
    .post('auth/registration', user)
    .then((res) => {
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
      localStorage.setItem('token', res.data.access_token);
      return res.data;
    })
    .catch((e) => {
      return e.response.data.message;
    });
};

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
    .post('services', service, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e.response.data);

      return e.response.data.message;
    });
};

export const patchService = (id: number | undefined, service: IService) => {
  return instance
    .patch(`services/${id}`, service, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      return e.response.data.message;
    });
};
