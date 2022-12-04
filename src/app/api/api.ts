import axios from 'axios';
import { IMaterial } from '../commonInterfaces/IMaterial';
import { IService } from '../commonInterfaces/IService';
import { IUser } from '../commonInterfaces/IUser';

export const instance = axios.create({
  baseURL: 'http://192.168.1.4:8000/',
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

export const deleteService = (id: number | undefined) => {
  return instance
    .delete(`services/${id}`, {
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

export const fetchMaterials = () => {
  return instance
    .get('materials')
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      return e.response.data.message;
    });
};

export const postMaterial = (material: IMaterial) => {
  return instance
    .post('materials', material, {
      headers: {
        Autorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      return e.response.data.message;
    });
};

export const patchMaterial = (id: number | undefined, material: IMaterial) => {
  return instance
    .patch(`materials/${id}`, material, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      return e.response.date.message;
    });
};

export const deleteMaterial = (id: number | undefined) => {
  return instance
    .delete(`materials/${id}`, {
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
