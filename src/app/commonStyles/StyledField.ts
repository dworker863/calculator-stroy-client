import { Field } from 'formik';
import styled from 'styled-components';

export const StyledField = styled(Field)`
  display: ${({ component }) =>
    component === 'select' ? 'inline-block' : 'block'};
  margin-top: 5px;
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 4px 8px;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.colors.gold};
  font-family: Gilroy, sans-serif;
  font-size: 16px;
  /* color: ${({ theme }) => theme.colors.primary}; */
`;
