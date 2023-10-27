import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

interface TableCellProps {
  isHeader?: boolean;
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

export const TableRow = styled.tr`
  &:nth-child(odd) {
    background-color: #f2f2f2;
  }
`;
