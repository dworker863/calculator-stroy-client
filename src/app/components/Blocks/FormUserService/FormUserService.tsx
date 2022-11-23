import React, { FC } from 'react';
import { IFormUserServiceState } from './IFormUserService';

const FormUserService: FC<IFormUserServiceState> = ({ service }) => {
  return (
    <div>
      <span>{service.name}</span>
      <select name="colors" id="color">
        {service.materials?.map((material, index) => (
          <option key={material + index} value={material}>
            {material}
          </option>
        ))}
      </select>
      <select name="materials" id="materials">
        {service.colors?.map((color, index) => (
          <option key={color + index} value={color}>
            {color}
          </option>
        ))}
      </select>
      <span>{service.price}</span>
    </div>
  );
};

export default FormUserService;
