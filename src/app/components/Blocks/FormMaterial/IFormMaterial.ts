import { IMaterial } from '../../../commonInterfaces/IMaterial';

export interface IMaterialState {
  material: IMaterial | any;
  hideFormHandler: () => void;
}
