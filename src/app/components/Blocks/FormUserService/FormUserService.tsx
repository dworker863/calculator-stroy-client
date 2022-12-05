import React, { FC } from 'react';
import { StyledSelect } from '../../../commonStyles/StyledSelect';
import { IFormUserServiceState } from './IFormUserService';
import {
  StyledUserServiceMaterial,
  StyledUserServiceTable,
  StyledUserServiceTd,
  StyledUserServiceTh,
  StyledUserServiceTr,
} from './StyledUserService';

const FormUserService: FC<IFormUserServiceState> = ({ service }) => {
  return (
    <StyledUserServiceTable>
      <StyledUserServiceTr>
        <StyledUserServiceTh>Название</StyledUserServiceTh>
        <StyledUserServiceTh>Материалы</StyledUserServiceTh>
        <StyledUserServiceTh>Цена</StyledUserServiceTh>
      </StyledUserServiceTr>
      <StyledUserServiceTr>
        <StyledUserServiceTd>{service.name}</StyledUserServiceTd>
        <StyledUserServiceTd>
          {service.materials?.map((material, index) => (
            <StyledUserServiceMaterial key={material.name + index}>
              {material.name}
            </StyledUserServiceMaterial>
          ))}
        </StyledUserServiceTd>
        <StyledUserServiceTd>{service.price}</StyledUserServiceTd>
      </StyledUserServiceTr>
    </StyledUserServiceTable>
  );
};

export default FormUserService;
