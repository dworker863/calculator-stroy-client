import React, { FC } from 'react';
import { IFormUserServiceState } from './IFormUserService';
import {
  StyledUserServiceMaterial,
  StyledUserServiceMaterialCell,
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
        <StyledUserServiceTh>Расход</StyledUserServiceTh>
        <StyledUserServiceTh>Упаковка</StyledUserServiceTh>
        <StyledUserServiceTh>Площадь</StyledUserServiceTh>
        <StyledUserServiceTh>Цена упаковки</StyledUserServiceTh>
        <StyledUserServiceTh>Стоимость материалов</StyledUserServiceTh>
        <StyledUserServiceTh>Стоимость услуги</StyledUserServiceTh>
        <StyledUserServiceTh>Общая стоимость</StyledUserServiceTh>
      </StyledUserServiceTr>
      <StyledUserServiceTr>
        <StyledUserServiceTd>{service.name}</StyledUserServiceTd>
        <StyledUserServiceTd>
          {service.materials?.map((material, index) => (
            <StyledUserServiceMaterialCell key={material.name + index}>
              {material.package}
            </StyledUserServiceMaterialCell>
          ))}
        </StyledUserServiceTd>
        <StyledUserServiceTd>
          {service.materials?.map((material, index) => (
            <StyledUserServiceMaterial key={material.name + index}>
              {material.name}
            </StyledUserServiceMaterial>
          ))}
        </StyledUserServiceTd>
        <StyledUserServiceTd>
          {service.materials?.map((material, index) => (
            <StyledUserServiceMaterialCell key={material.name + index}>
              {material.consumption}
            </StyledUserServiceMaterialCell>
          ))}
        </StyledUserServiceTd>
        <StyledUserServiceTd></StyledUserServiceTd>
        <StyledUserServiceTd>
          {service.materials?.map((material, index) => (
            <StyledUserServiceMaterialCell key={material.name + index}>
              {material.price}
            </StyledUserServiceMaterialCell>
          ))}
        </StyledUserServiceTd>
        <StyledUserServiceTd>{service.price}</StyledUserServiceTd>
        <StyledUserServiceTd></StyledUserServiceTd>
        <StyledUserServiceTd></StyledUserServiceTd>
      </StyledUserServiceTr>
      <StyledUserServiceTr></StyledUserServiceTr>
    </StyledUserServiceTable>
  );
};

export default FormUserService;
