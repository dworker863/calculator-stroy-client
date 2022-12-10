import styled from 'styled-components';

export const StyledUserServiceTable = styled.table`
  /* min-width: max-content; */
  margin-bottom: 20px;
`;

export const StyledUserServiceTr = styled.tr``;

export const StyledUserServiceTh = styled.th`
  min-width: max-content;
  padding-right: 10px;
  padding-left: 10px;
  text-align: center;
  font-weight: 400;
  line-height: 40px;

  &:first-child {
    padding-left: 0;
    text-align: left;
  }
`;

export const StyledUserServiceTd = styled.td`
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
