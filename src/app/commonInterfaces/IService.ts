export interface IService {
  name: string;
  measure: string;
  materials?: string[] | null;
  colors?: string[] | null;
  price: number;
}
