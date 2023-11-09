import styled from "styled-components";
import { css } from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

interface TableCellProps {
  isHeader?: boolean;
}

interface TableRowProps {
  isLight: boolean;
}

export const TableCell = styled.td.withConfig({
  shouldForwardProp: (prop) => !["isHeader"].includes(prop),
})<TableCellProps>`
  padding: 10px;
  border: 1px solid #ccc;
  color: ${({ isHeader }) => isHeader && "#fff"};
`;

export const RowHeader = styled.tr`
  background-color: black;
`;

export const TableRow = styled.tr.withConfig({
  shouldForwardProp: (prop) => !["isLight"].includes(prop),
})<TableRowProps>`
  ${({ isLight }) =>
    isLight &&
    css`
      &:nth-child(odd) {
        background-color: #f2f2f2;
      }
    `}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: end;
`;
