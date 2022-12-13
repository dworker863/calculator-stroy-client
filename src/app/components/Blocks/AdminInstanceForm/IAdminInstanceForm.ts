import { IMaterial } from './../../../commonInterfaces/IMaterial';
import { IService } from '../../../commonInterfaces/IService';

export interface IAdminInstanceFormState {
  instances: (IService | IMaterial)[];
  type: 'materials' | 'services';
}
