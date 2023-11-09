import { useColorMode } from "@chakra-ui/color-mode";
import { DeleteIcon } from "@chakra-ui/icons";
import { FaPencilAlt } from "react-icons/fa"; // Importando o ícone de lápis
import { Button } from "../../../../components/Button";
import { InputComponent } from "../../../../components/Input";
import { SelectComponent } from "../../../../components/Select";
import { IInstituteModel } from "../../../../services/InstitueService/dtos/IGetInstituteDTOResponse";
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
import { Spinner } from "@chakra-ui/react";

interface TableInstitutesProps {
  data: IInstituteModel[];
  loading: boolean;
  handleEdit: (dataTable: IInstituteModel) => void;
  handleDelete: (id: string) => void;
}

export function TableInstitutes({
  data,
  loading,
  handleEdit,
  handleDelete,
}: TableInstitutesProps) {
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
            <TableCell isHeader>Instituto</TableCell>
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
            data.map(({ id, name, acronym }) => (
              <TableRow key={id} isLight={colorMode === "light"}>
                <TableCell>{name}</TableCell>
                <TableCell>{acronym}</TableCell>
                <TableCell style={{ textAlign: "center", display: "flex" }}>
                  <Button
                    style={{ marginRight: "8px" }}
                    onClick={() => handleEdit({ id, name, acronym })}
                  >
                    <FaPencilAlt size={14} color="#fff" />
                  </Button>
                  <Button onClick={() => handleDelete(id)}>
                    <DeleteIcon boxSize={4} color="#fff" />
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
