import { useState } from "react";
import { Button } from "../../components/Button";
import { ModalUsers } from "./components/ModalUsers";
import { TableUsers } from "./components/TableUsers";
import { arrayUsersMock, optionsInstituteMock } from "./mock";
import { Container, Title, Wrapper, WrapperTable } from "./style";
import { FormDataUsers, ITableUsers } from "./types";
import { defaultValues } from "./utils";
import { ModalDelete } from "../../components/ModalDelete";

export function Users() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [dataFormModalUser, setDataFormModalUser] =
    useState<FormDataUsers>(defaultValues);

  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [dataIdModalUser, setIdModalUser] = useState<number>(null);

  const isModalOpenCreate = isModalOpen && dataFormModalUser === defaultValues;
  const isModalOpenEdit = isModalOpen && dataFormModalUser !== defaultValues;

  const isModalOpenDelete = deleteOpenModal && dataIdModalUser !== null;

  const handleOpenModal = () => setModalOpen(true);

  const handleCloseModal = () => {
    setDataFormModalUser(defaultValues);
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setDeleteOpenModal(true);
    setIdModalUser(id);
  };

  const handleCloseModalDelete = () => {
    setDeleteOpenModal(false);
    setIdModalUser(null);
  };

  const handleConfirmDelete = (id: number) => {
    console.log("Excluir usuário id", id);
  };

  const getInstituteById = (institute: string) => {
    return optionsInstituteMock.find((item) => item.label === institute).value;
  };

  const handleEdit = (dataTable: ITableUsers) => {
    setDataFormModalUser({
      ...dataTable,
      role: dataTable.role.toLowerCase(),
      confirmPassword: "",
      institute_id: getInstituteById(dataTable.institute),
      password: "",
    });
    setModalOpen(true);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Usuários</Title>
        <Button onClick={handleOpenModal}>Cadastrar</Button>
      </Wrapper>

      <WrapperTable>
        <TableUsers
          data={arrayUsersMock}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </WrapperTable>

      {isModalOpenCreate && (
        <ModalUsers
          handleCloseModal={handleCloseModal}
          dataFormModalUser={dataFormModalUser}
          isModalCreate
        />
      )}

      {isModalOpenEdit && (
        <ModalUsers
          handleCloseModal={handleCloseModal}
          dataFormModalUser={dataFormModalUser}
        />
      )}

      {isModalOpenDelete && (
        <ModalDelete
          handleCloseModal={handleCloseModalDelete}
          deleteOpenModal={deleteOpenModal}
          id={dataIdModalUser}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
    </Container>
  );
}
