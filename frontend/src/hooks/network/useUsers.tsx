import { useState } from "react";
import UserService from "../../services/UserService";
import { IUserModel } from "../../services/UserService/dtos/IGetUserDTOResponse";
import { IPostUserModel } from "../../services/UserService/dtos/IPostUserDTOResponse";
import { IPutUserModel } from "../../services/UserService/dtos/IPutUserDTOResponse";
import { useUtils } from "./useUtils";

const defaultValues: IPostUserModel = {
  cpf: "",
  email: "",
  institute_id: "",
  matriculation: "",
  name: "",
  password: "",
  confirmPassword: "",
  role: null,
  university_degree: null,
};

export function useUser() {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState<IUserModel[]>([]);
  const userService = new UserService();

  const { showToastError, showToastSuccess } = useUtils();

  const [isModalOpen, setModalOpen] = useState(false);
  const [dataFormModalUser, setDataFormModalUser] =
    useState<IPostUserModel>(defaultValues);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [dataIdModalUser, setIdModalUser] = useState<string>("");

  const handleOpenModalCreate = () => setModalOpen(true);
  const handleCloseModalCreate = () => setModalOpen(false);

  const handleOpenModalEdit = (dataTable: IUserModel) => {
    setDataFormModalUser({
      ...dataTable,
    });
    setModalOpen(true);
  };
  const handleCloseModalEdit = () => {
    setDataFormModalUser(defaultValues);
    setModalOpen(false);
  };

  const handleOpenModalDelete = (id: string) => {
    setDeleteOpenModal(true);
    setIdModalUser(id);
  };
  const handleCloseModalDelete = () => {
    setDeleteOpenModal(false);
    setIdModalUser(null);
  };

  async function getUsers(): Promise<void> {
    setLoading(true);

    try {
      const { body } = await userService.getUsers();
      setAllUsers(body);
    } catch (error) {
      showToastError({
        title: "Error",
        description: "Erro ao buscar dados de usuários!",
      });
    } finally {
      setLoading(false);
    }
  }

  async function postUser(dataForm: IPostUserModel) {
    setLoading(true);

    try {
      await userService.postUser(dataForm);
      showToastSuccess({
        title: "Sucesso",
        description: "Usuário cadastrado com sucesso",
      });
      await getUsers();
      handleCloseModalCreate();
    } catch (error) {
      showToastError({
        title: "Error",
        description: "Erro ao cadastrar usuário",
      });
    } finally {
      setLoading(false);
    }
  }

  async function putUser(dataForm: IPutUserModel) {
    setLoading(true);

    try {
      await userService.putUser(dataForm);
      showToastSuccess({
        title: "Sucesso",
        description: "Usuário editado com sucesso!",
      });
      await getUsers();
      handleCloseModalEdit();
    } catch (error) {
      showToastError({
        title: "Erro",
        description: "Erro ao editar usuário!",
      });
    } finally {
      setLoading(false);
    }
  }

  async function deleteInsititute() {
    setLoading(true);

    try {
      await userService.deleteUser({ id: dataIdModalUser });
      showToastSuccess({
        title: "Sucesso",
        description: "Usuário deletado com sucesso!",
      });
      await getUsers();
      handleCloseModalDelete();
    } catch (error) {
      showToastError({
        title: "Erro",
        description: "Erro ao deletar Usuário!",
      });
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    allUsers,
    isModalOpen,
    defaultValues,
    dataIdModalUser,
    dataFormModalUser,
    deleteOpenModal,
    handleOpenModalCreate,
    handleCloseModalCreate,
    handleOpenModalEdit,
    handleCloseModalEdit,
    handleOpenModalDelete,
    handleCloseModalDelete,
    getUsers,
    postUser,
    setAllUsers,
    putUser,
    deleteInsititute,
  };
}
