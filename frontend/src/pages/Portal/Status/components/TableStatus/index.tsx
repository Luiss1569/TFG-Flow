import { useColorMode } from "@chakra-ui/color-mode";
import { Spinner } from "@chakra-ui/react";
import { FaEraser, FaPencilAlt } from "react-icons/fa";
import { Button } from "../../../../../components/Button";
import { InputComponent } from "../../../../../components/Input";
import { SelectComponent } from "../../../../../components/Select";
import { optionsColunmTable } from "../../utils";
import {
  Content,
  RowHeader,
  Table,
  TableCell,
  TableRow,
  TdLoading,
  Wrapper,
} from "./styles";
import Status from "../../../../../interfaces/Status";

interface TableInstitutesProps {
  data: Status[];
  loading: boolean;
  handleEdit: (dataTable: Status) => void;
  handleDelete: (id: string) => void;
}

export function TableStatus({
  data,
  loading,
  handleEdit,
  handleDelete,
}: Readonly<TableInstitutesProps>) {
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
            <TableCell isHeader>Nome</TableCell>
            <TableCell isHeader style={{ textAlign: "center", width: "10%" }}>
              Ação
            </TableCell>
          </RowHeader>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <TdLoading colSpan={3}>
                <span>
                  <Spinner size="xl" />
                </span>
              </TdLoading>
            </tr>
          ) : (
            data.map((status) => (
              <TableRow key={status.id} isLight={colorMode === "light"}>
                <TableCell>{status.name}</TableCell>
                <TableCell style={{ textAlign: "center", display: "flex" }}>
                  <Button
                    style={{ marginRight: "8px" }}
                    onClick={() => handleEdit(status)}
                  >
                    <FaPencilAlt size={14} color="#fff" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(status.id)}
                    color="#fff"
                  >
                    <FaEraser size={14} color="#fff" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </tbody>
      </Table>
    </Wrapper>
  );
}
