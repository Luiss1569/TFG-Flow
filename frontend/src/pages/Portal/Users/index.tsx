import { useEffect } from "react";
import { Button } from "../../../components/Button";
import { ModalDelete } from "../Status/ModalDelete";
import { useUser } from "../../../hooks/network/useUsers";
import { ModalUsers } from "./components/ModalUsers";
import { TableUsers } from "./components/TableUsers";
import { Container, Title, Wrapper, WrapperTable } from "./style";
import { SubmitHandler } from "react-hook-form";
import { IPostUserModel } from "../../../services/UserService/dtos/IPostUserDTOResponse";
import { IPutUserModel } from "../../../services/UserService/dtos/IPutUserDTOResponse";
import { useInstitute } from "../../../hooks/network/useInstitutes";

export function Users() {
  const {
    loading,
    allUsers,
    dataFormModalUser,
    deleteOpenModal,
    dataIdModalUser,
    defaultValues,
    isModalOpen,
    getUsers,
    deleteInsititute,
    postUser,
    putUser,
    handleOpenModalCreate,
    handleOpenModalEdit,
    handleOpenModalDelete,
    handleCloseModalCreate,
    handleCloseModalEdit,
    handleCloseModalDelete,
    setAllUsers,
  } = useUser();

  const { getInstitutes, allInstitutes } = useInstitute();

  const isModalOpenCreate = isModalOpen && dataFormModalUser === defaultValues;
  const isModalOpenEdit = isModalOpen && dataFormModalUser !== defaultValues;
  const isModalOpenDelete = deleteOpenModal && dataIdModalUser !== "";

  const onSubmit: SubmitHandler<IPostUserModel | IPutUserModel> = async (
    data
  ) => {
    data = {
      ...data,
      university_degree: !data.university_degree
        ? null
        : data.university_degree,
    };

    if (isModalOpenCreate) {
      await postUser(data as IPostUserModel);
    } else {
      await putUser(data as IPutUserModel);
    }
  };

  useEffect(() => {
    getUsers();
    getInstitutes();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Usuários</Title>
        <Button onClick={handleOpenModalCreate} color="#fff">
          Cadastrar
        </Button>
      </Wrapper>

      <WrapperTable>
        <TableUsers
          data={allUsers}
          loading={loading}
          handleEdit={handleOpenModalEdit}
          handleDelete={handleOpenModalDelete}
          setAllUsers={setAllUsers}
          institutes={allInstitutes}
        />
      </WrapperTable>

      {isModalOpenCreate && (
        <ModalUsers
          handleCloseModal={handleCloseModalCreate}
          dataFormModalUser={dataFormModalUser}
          loading={loading}
          onSubmit={onSubmit}
          isModalCreate
          institutes={allInstitutes}
        />
      )}

      {isModalOpenEdit && (
        <ModalUsers
          handleCloseModal={handleCloseModalEdit}
          dataFormModalUser={dataFormModalUser}
          loading={loading}
          onSubmit={onSubmit}
          institutes={allInstitutes}
        />
      )}

      {isModalOpenDelete && (
        <ModalDelete
          handleCloseModal={handleCloseModalDelete}
          deleteOpenModal={deleteOpenModal}
          onClick={deleteInsititute}
        />
      )}
    </Container>
  );
}
