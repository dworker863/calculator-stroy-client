import { IService } from './../../../commonInterfaces/IService';

export interface IFormServiceState {
  service: IService | any;
  hideFormHandler: () => void;
}
