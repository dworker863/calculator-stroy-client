import { IService } from './IService';

export interface IMaterial {
  id?: number;
  name: string;
  consumption: number;
  package: number;
  services: IService[] | null;
  price: number;
}
