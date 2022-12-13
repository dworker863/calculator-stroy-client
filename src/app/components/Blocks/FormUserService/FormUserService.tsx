import React, { FC } from 'react';
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
        <StyledUserServiceTh>Упаковка</StyledUserServiceTh>
        <StyledUserServiceTh>Расход</StyledUserServiceTh>
        <StyledUserServiceTh>Цена упаковки</StyledUserServiceTh>
        <StyledUserServiceTh>Стоимость материалов</StyledUserServiceTh>
        <StyledUserServiceTh>Стоимость услуги</StyledUserServiceTh>
        <StyledUserServiceTh>Площадь</StyledUserServiceTh>
        <StyledUserServiceTh>Общая стоимость</StyledUserServiceTh>
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
        <StyledUserServiceTd></StyledUserServiceTd>
        <StyledUserServiceTd></StyledUserServiceTd>
        <StyledUserServiceTd></StyledUserServiceTd>
        <StyledUserServiceTd></StyledUserServiceTd>
        <StyledUserServiceTd>{service.price}</StyledUserServiceTd>
        <StyledUserServiceTd></StyledUserServiceTd>
        <StyledUserServiceTd></StyledUserServiceTd>
      </StyledUserServiceTr>
      <StyledUserServiceTr></StyledUserServiceTr>
    </StyledUserServiceTable>
  );
};

export default FormUserService;
