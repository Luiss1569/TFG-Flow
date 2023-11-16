import { useEffect, useState } from "react";
import { useColorMode } from "@chakra-ui/color-mode";
import { Spinner } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { FaPencilAlt } from "react-icons/fa";
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
import { IUserModel } from "../../../../../services/UserService/dtos/IGetUserDTOResponse";
import { IInstituteModel } from "../../../../../services/InstitueService/dtos/IGetInstituteDTOResponse";
import { IPostUserModel } from "../../../../../services/UserService/dtos/IPostUserDTOResponse";

interface TableUsersProps {
  data: IUserModel[] | null;
  loading: boolean;
  //@ts-ignore
  handleEdit: (dataTable: IPostUserModel) => void;
  handleDelete: (id: string) => void;
  //@ts-ignore
  setAllUsers: Dispatch<SetStateAction<IUserModel[] | null>>;
  institutes: IInstituteModel[] | null;
}

const rolesMap = (role: string) => {
  switch (role) {
    case "student":
      return "Aluno";
    case "teacher":
      return "Professor";
    case "coordinator":
      return "Coordenador";
    case "admin":
      return "Administrador";
    default:
      return "Usuário";
  }
};
//ts-ignore
export function TableUsers({
  data,
  loading,
  setAllUsers,
  handleEdit,

  institutes,
}: TableUsersProps) {
  const { colorMode } = useColorMode();

  useEffect(() => {
    //@ts-ignore
    setAllUsers(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    const newUpdateInstance: IUserModel[] = [];
    const textTyped = new RegExp(value.toUpperCase(), "i");
    //@ts-ignore
    for (const item of data) {
      if (item.name.match(textTyped)) {
        console.log(1);
        //@ts-ignore
        newUpdateInstance.push(item);
      } else {
        console.log(2);
        //@ts-ignore
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
            <TableCell isHeader>Perfil</TableCell>
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
            data?.map(
              ({
                id,
                role,
                name,
                email,
                cpf,
                matriculation,
                institute_id,
                ...rest
              }) => (
                <TableRow key={id} isLight={colorMode === "light"}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{rolesMap(role)}</TableCell>
                  <TableCell>{matriculation}</TableCell>
                  <TableCell>
                    {institutes?.find((inst) => inst.id === institute_id)?.name}
                  </TableCell>
                  <TableCell style={{ textAlign: "center", display: "flex" }}>
                    <Button
                      style={{ marginRight: "8px" }}
                      onClick={() =>
                        handleEdit({
                          cpf,
                          email,
                          institute_id,
                          matriculation,
                          name,
                          role,
                          password: "",
                          confirmPassword: "",
                          ...rest,
                        })
                      }
                    >
                      <FaPencilAlt size={14} color="#fff" />
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
