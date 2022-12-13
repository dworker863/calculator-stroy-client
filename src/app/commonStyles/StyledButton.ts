import styled from 'styled-components';

export const StyledButton = styled.button`
  cursor: pointer;
  margin-bottom: 20px;
  margin-right: 10px;
  padding: 8px 30px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: #fff;
`;