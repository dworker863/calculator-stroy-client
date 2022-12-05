import { IMaterial } from './IMaterial';

export interface IService {
  id?: number;
  name: string;
  measure: string;
  materials?: IMaterial[] | null;
  price: number;
}
