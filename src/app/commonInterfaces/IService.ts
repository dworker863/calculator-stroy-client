export interface IService {
  id?: number;
  name: string;
  measure: string;
  materials?: string[] | null;
  colors?: string[] | null;
  price: number;
}
