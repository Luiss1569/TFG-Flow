import { useEffect, useState } from "react";
import { useColorMode } from "@chakra-ui/color-mode";
import { DeleteIcon } from "@chakra-ui/icons";
import { Spinner } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { Button } from "../../../../components/Button";
import { InputComponent } from "../../../../components/Input";
import { SelectComponent } from "../../../../components/Select";

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
import { IUserModel } from "../../../../services/UserService/dtos/IGetUserDTOResponse";
import { IInstituteModel } from "../../../../services/InstitueService/dtos/IGetInstituteDTOResponse";

interface TableUsersProps {
  data: IUserModel[];
  loading: boolean;
  handleEdit: (dataTable: IUserModel) => void;
  handleDelete: (id: string) => void;
  setAllUsers: Dispatch<SetStateAction<IUserModel[]>>;
  institutes: IInstituteModel[];
}

export function TableUsers({
  data,
  loading,
  setAllUsers,
  handleEdit,
  handleDelete,
  institutes,
}: TableUsersProps) {
  const { colorMode } = useColorMode();

  useEffect(() => {
    setAllUsers(data);
  }, []);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    const newUpdateInstance: IUserModel[] = [];
    const textTyped = new RegExp(value.toUpperCase(), "i");

    for (const item of data) {
      if (item.name.match(textTyped)) {
        console.log(1);
        newUpdateInstance.push(item);
      } else {
        console.log(2);
        setAllUsers(data);
      }

      setAllUsers(newUpdateInstance);
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
            <TableCell isHeader>Email</TableCell>
            <TableCell isHeader>CPF</TableCell>
            <TableCell isHeader>Matricula</TableCell>
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
            data.map(
              ({ id, role, name, email, cpf, matriculation, institute_id }) => (
                <TableRow key={id} isLight={colorMode === "light"}>
                  <TableCell>{role}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{cpf}</TableCell>
                  <TableCell>{matriculation}</TableCell>
                  <TableCell>
                    {institutes.find((inst) => inst.id === institute_id)?.name}
                  </TableCell>
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
                          institute_id,
                        })
                      }
                    >
                      <FaPencilAlt size={14} color="#fff" />
                    </Button>
                    <Button onClick={() => handleDelete(id)}>
                      <DeleteIcon boxSize={4} color="#fff" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )
          )}
        </tbody>
      </Table>
    </Wrapper>
  );
}