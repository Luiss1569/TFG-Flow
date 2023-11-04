import { FaPencilAlt } from "react-icons/fa"; // Importando o ícone de lápis
import { Button } from "../../../../components/Button";
import { InputComponent } from "../../../../components/Input";
import { SelectComponent } from "../../../../components/Select";
import { ITableUsers } from "../../types";
import { optionsColunmTable } from "../../utils";
import {
  Content,
  RowHeader,
  Table,
  TableCell,
  TableRow,
  Wrapper,
} from "./styles";
import { DeleteIcon } from "@chakra-ui/icons";

interface TableUsersProps {
  data: ITableUsers[];
  handleEdit: (dataTable: ITableUsers) => void;
  handleDelete: (id: number) => void;
}

export function TableUsers({
  data,
  handleEdit,
  handleDelete,
}: TableUsersProps) {
  return (
    <Wrapper>
      <SelectComponent
        label="Selecione a coluna"
        options={optionsColunmTable}
      />
      <Content>
        <InputComponent
          label="Pesquisar"
          placeholder="Digite para pesquisar"
          isSearch={true}
        />
        <Button>Pesquisar</Button>
      </Content>

      <Table>
        <thead>
          <RowHeader>
            <TableCell isHeader>Perfil</TableCell>
            <TableCell isHeader>Nome</TableCell>
            <TableCell isHeader>Email</TableCell>
            <TableCell isHeader>CPF</TableCell>
            <TableCell isHeader>Matrícula</TableCell>
            <TableCell isHeader>Instituto</TableCell>
            <TableCell isHeader style={{ textAlign: "center", width: "10%" }}>
              Ação
            </TableCell>
          </RowHeader>
        </thead>

        <tbody>
          {data.map(
            ({ id, role, name, email, cpf, matriculation, institute }) => (
              <TableRow key={id}>
                <TableCell>{role}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{cpf}</TableCell>
                <TableCell>{matriculation}</TableCell>
                <TableCell>{institute}</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <Button
                    style={{ marginRight: "8px" }}
                    onClick={() =>
                      handleEdit({
                        id,
                        role,
                        name,
                        email,
                        cpf,
                        matriculation,
                        institute,
                      })
                    }
                  >
                    <FaPencilAlt size={12} />
                  </Button>
                  <Button onClick={() => handleDelete(id)}>
                    <DeleteIcon boxSize={4} />
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
        </tbody>
      </Table>
    </Wrapper>
  );
}
