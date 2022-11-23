import { Field } from 'formik';
import styled from 'styled-components';

export const StyledField = styled(Field)`
  padding: 5px;
  color: ${({ theme }) => theme.colors.primary};
`;
