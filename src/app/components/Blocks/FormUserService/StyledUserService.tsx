import styled from 'styled-components';

export const StyledUserServiceTable = styled.table`
  width: 300px;
  margin-bottom: 20px;
`;

export const StyledUserServiceTr = styled.tr``;

export const StyledUserServiceTh = styled.th`
  width: 100px;
  text-align: center;
  font-weight: 400;
  line-height: 40px;

  &:first-child {
    text-align: left;
  }
`;

export const StyledUserServiceTd = styled.td`
  width: 100px;
  text-align: center;

  &:first-child {
    text-align: left;
  }
`;

export const StyledUserServiceMaterial = styled.div`
  padding: 5px 30px;
  border-radius: 10px;
  background-color: #e8eaed;
`;
