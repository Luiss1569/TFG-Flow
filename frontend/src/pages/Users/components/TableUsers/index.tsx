import { ITableUsers } from "../../types";
import { Table, RowHeader, TableCell, TableRow } from "./styles";

interface TableUsersProps {
  data: ITableUsers[];
}

export function TableUsers({ data }: TableUsersProps) {
  return (
    <Table>
      <thead>
        <RowHeader>
          <TableCell isHeader>Perfil</TableCell>
          <TableCell isHeader>Nome</TableCell>
          <TableCell isHeader>Email</TableCell>
          <TableCell isHeader>CPF</TableCell>
          <TableCell isHeader>Matrícula</TableCell>
        </RowHeader>
      </thead>

      <tbody>
        {data.map(({ id, perfil, name, email, cpf, register }) => (
          <TableRow key={id}>
            <TableCell>{perfil}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{cpf}</TableCell>
            <TableCell>{register}</TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}
