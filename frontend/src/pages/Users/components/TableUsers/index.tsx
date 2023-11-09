/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";
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
  const { colorMode } = useColorMode();

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
        <Button color="#fff">Pesquisar</Button>
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
              <TableRow key={id} isLight={colorMode === "light"}>
                <TableCell>{role}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{cpf}</TableCell>
                <TableCell>{matriculation}</TableCell>
                <TableCell>{institute}</TableCell>
                <TableCell style={{ textAlign: "center", display: "flex" }}>
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
                    <FaPencilAlt size={12} color="#fff" />
                  </Button>
                  <Button onClick={() => handleDelete(id)}>
                    <DeleteIcon boxSize={4} color="#fff" />
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
