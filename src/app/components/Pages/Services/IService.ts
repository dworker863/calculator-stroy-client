import { IMaterial } from '../../../commonInterfaces/IMaterial';
import { IService } from '../../../commonInterfaces/IService';

export interface IServiceState {
  type: 'materials' | 'services';
  instances: (IService | IMaterial)[];
}
