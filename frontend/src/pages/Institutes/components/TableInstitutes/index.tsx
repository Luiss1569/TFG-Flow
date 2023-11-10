import { useEffect, useState } from "react";
import { useColorMode } from "@chakra-ui/color-mode";
import { DeleteIcon } from "@chakra-ui/icons";
import { Spinner } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { FaPencilAlt } from "react-icons/fa";
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

interface TableInstitutesProps {
  data: IInstituteModel[];
  loading: boolean;
  handleEdit: (dataTable: IInstituteModel) => void;
  handleDelete: (id: string) => void;
  setAllInstitutes: Dispatch<SetStateAction<IInstituteModel[]>>;
}

export function TableInstitutes({
  data,
  loading,
  setAllInstitutes,
  handleEdit,
  handleDelete,
}: TableInstitutesProps) {
  const { colorMode } = useColorMode();

  useEffect(() => {
    setAllInstitutes(data);
  }, [data]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    const newUpdateInstance: IInstituteModel[] = [];
    const textTyped = new RegExp(value.toUpperCase(), "i");

    for (const item of data) {
      if (item.name.match(textTyped)) {
        console.log(1);
        newUpdateInstance.push(item);
      } else {
        console.log(2);
        setAllInstitutes(data);
      }

      setAllInstitutes(newUpdateInstance);
    }
  };

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
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
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
