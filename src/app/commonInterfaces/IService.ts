export interface IService {
  id?: number;
  name: string;
  measure: string;
  materials?: string[] | null;
  price: number;
}
