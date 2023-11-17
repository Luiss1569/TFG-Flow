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
import Form from "../../../../../interfaces/Form";

const formType = {
  public: "Público",
  private: "Privado",
};

interface TableInstitutesProps {
  data: Form[];
  loading: boolean;
  handleEdit: (dataTable: Form) => void;
  handleDelete: (id: string) => void;
}

export function TableForm({
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
            <TableCell isHeader>Slug</TableCell>
            <TableCell isHeader>Tipo</TableCell>
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
            data.map((form) => (
              <TableRow key={form.id} isLight={colorMode === "light"}>
                <TableCell>{form.name}</TableCell>
                <TableCell>{form.slug}</TableCell>
                <TableCell>{formType[form.form_type]}</TableCell>
                <TableCell style={{ textAlign: "center", display: "flex" }}>
                  <Button
                    style={{ marginRight: "8px" }}
                    onClick={() => handleEdit(form)}
                    id="btn-edit"
                  >
                    <FaPencilAlt size={14} color="#fff" />
                  </Button>
                  <Button
                    onClick={() => handleDelete(form.id)}
                    color="#fff"
                    id="btn-delete"
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
