import { Field } from 'formik';
import styled from 'styled-components';

export const StyledField = styled(Field)`
  display: block;
  margin-top: 5px;
  margin-bottom: 20px;
  padding: 4px 8px;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  font-family: Gilroy, sans-serif;
  font-size: 16px;
  /* color: ${({ theme }) => theme.colors.primary}; */
`;
