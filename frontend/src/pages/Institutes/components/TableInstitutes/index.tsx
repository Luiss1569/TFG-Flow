import { FaPencilAlt } from "react-icons/fa"; // Importando o ícone de lápis
import { Button } from "../../../../components/Button";
import { InputComponent } from "../../../../components/Input";
import { SelectComponent } from "../../../../components/Select";
import { ITableInstitutes } from "../../types";
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

interface TableInstitutesProps {
  data: ITableInstitutes[];
  handleEdit: (dataTable: ITableInstitutes) => void;
  handleDelete: (id: number) => void;
}

export function TableInstitutes({
  data,
  handleEdit,
  handleDelete,
}: TableInstitutesProps) {
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
            <TableCell isHeader>Nome</TableCell>
            <TableCell isHeader>Instituto</TableCell>
            <TableCell isHeader style={{ textAlign: "center", width: "10%" }}>
              Ação
            </TableCell>
          </RowHeader>
        </thead>

        <tbody>
          {data.map(({ id, name, acronym }) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell>{acronym}</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <Button
                  style={{ marginRight: "8px" }}
                  onClick={() => handleEdit({ id, name, acronym })}
                >
                  <FaPencilAlt size={14} />
                </Button>
                <Button onClick={() => handleDelete(id)}>
                  <DeleteIcon boxSize={4} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}
