import React, { ChangeEvent, FC, useState } from 'react';
import { IFormUserServiceState } from './IFormUserService';
import {
  StyledSize,
  StyledUserServiceMaterial,
  StyledUserServiceMaterialCell,
  StyledUserServiceTable,
  StyledUserServiceTd,
  StyledUserServiceTh,
  StyledUserServiceTr,
} from './StyledUserService';

const FormUserService: FC<IFormUserServiceState> = ({ service }) => {
  const [size, setSize] = useState(0);

  const sizeFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSize(+e.target.value);
  };

  const getMaterialPrice = (
    consumption: number,
    size: number,
    materialPackage: number,
    price: number,
  ) => ((consumption * size) / materialPackage) * price;

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
        <StyledUserServiceTd>
          {service.materials?.map((material, index) => (
            <StyledUserServiceMaterialCell key={material.name + index}>
              {material.package}
            </StyledUserServiceMaterialCell>
          ))}
        </StyledUserServiceTd>
        <StyledUserServiceTd>
          <StyledSize type="text" onChange={sizeFieldHandler} />
        </StyledUserServiceTd>
        <StyledUserServiceTd>
          {service.materials?.map((material, index) => (
            <StyledUserServiceMaterialCell key={material.name + index}>
              {material.price}
            </StyledUserServiceMaterialCell>
          ))}
        </StyledUserServiceTd>
        <StyledUserServiceTd>
          {service.materials?.map((material, index) => (
            <StyledUserServiceMaterialCell key={material.name + index}>
              {getMaterialPrice(
                material.consumption,
                size,
                material.package,
                material.price,
              )}
            </StyledUserServiceMaterialCell>
          ))}
        </StyledUserServiceTd>
        <StyledUserServiceTd>{service.price * size}</StyledUserServiceTd>
        <StyledUserServiceTd>
          {service.materials?.reduce(
            (sum, material) =>
              (sum += getMaterialPrice(
                material.consumption,
                size,
                material.package,
                material.price,
              )),
            0,
          ) +
            service.price * size}
        </StyledUserServiceTd>
      </StyledUserServiceTr>
    </StyledUserServiceTable>
  );
};

export default FormUserService;
