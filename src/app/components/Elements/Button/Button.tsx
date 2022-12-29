import React, { FC } from 'react';
import { IButton } from './IButton';
import { StyledButton } from './StyledButton';

const Button: FC<IButton> = ({ text, type, inline }) => {
  return (
    <StyledButton type={type} inline={inline}>
      {text}
    </StyledButton>
  );
};

export default Button;
