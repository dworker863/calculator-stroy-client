import { IMaterial } from './../../../commonInterfaces/IMaterial';
import { IService } from '../../../commonInterfaces/IService';

export interface IAdminInstanceFormState {
  type: 'materials' | 'services';
  isAdmin: boolean;
  instances: (IService | IMaterial)[];
}
