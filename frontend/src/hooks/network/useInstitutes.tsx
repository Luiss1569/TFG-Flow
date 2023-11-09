import { useState } from "react";
import InstituteService from "../../services/InstitueService";
import { IInstituteModel } from "../../services/InstitueService/dtos/IGetInstituteDTOResponse";
import { IPostInstituteModel } from "../../services/InstitueService/dtos/IPostInstituteDTOResponse";
import { IPutInstituteModel } from "../../services/InstitueService/dtos/IPutInstituteDTOResponse";
import { useUtils } from "./useUtils";

const defaultValues: IPostInstituteModel = {
  name: "",
  acronym: "",
};

export function useInstitute() {
  const [loading, setLoading] = useState(false);
  const [allInstitutes, setAllInstitutes] = useState<IInstituteModel[]>([]);
  const instituteService = new InstituteService();

  const { showToastError, showToastSuccess } = useUtils();

  const [isModalOpen, setModalOpen] = useState(false);
  const [dataFormModalInstitute, setDataFormModalInstitute] =
    useState<IPostInstituteModel>(defaultValues);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [dataIdModalInstitute, setIdModalInstitute] = useState<string>("");

  const handleOpenModalCreate = () => setModalOpen(true);
  const handleCloseModalCreate = () => setModalOpen(false);

  const handleOpenModalEdit = (dataTable: IInstituteModel) => {
    setDataFormModalInstitute({
      ...dataTable,
    });
    setModalOpen(true);
  };
  const handleCloseModalEdit = () => {
    setDataFormModalInstitute(defaultValues);
    setModalOpen(false);
  };

  const handleOpenModalDelete = (id: string) => {
    setDeleteOpenModal(true);
    setIdModalInstitute(id);
  };
  const handleCloseModalDelete = () => {
    setDeleteOpenModal(false);
    setIdModalInstitute(null);
  };

  async function getInstitutes(): Promise<void> {
    setLoading(true);

    try {
      const { body } = await instituteService.getInstitutes();
      setAllInstitutes(body);
    } catch (error) {
      showToastError({
        title: "Error",
        description: "Erro ao buscar dados de instituto!",
      });
    } finally {
      setLoading(false);
    }
  }

  async function postInstitute(dataForm: IPostInstituteModel) {
    setLoading(true);

    try {
      await instituteService.postInstitute(dataForm);
      showToastSuccess({
        title: "Sucesso",
        description: "Instituo cadastrado com sucesso",
      });
      await getInstitutes();
      handleCloseModalCreate();
    } catch (error) {
      showToastError({
        title: "Error",
        description: "Erro ao cadastrar instituto",
      });
    } finally {
      setLoading(false);
    }
  }

  async function putInstitute(dataForm: IPutInstituteModel) {
    setLoading(true);

    try {
      await instituteService.putInstitute(dataForm);
      showToastSuccess({
        title: "Sucesso",
        description: "Instituto editado com sucesso!",
      });
      await getInstitutes();
      handleCloseModalEdit();
    } catch (error) {
      showToastError({
        title: "Erro",
        description: "Erro ao editar instituto!",
      });
    } finally {
      setLoading(false);
    }
  }

  async function deleteInsititute() {
    setLoading(true);

    try {
      await instituteService.deleteInstitute({ id: dataIdModalInstitute });
      showToastSuccess({
        title: "Sucesso",
        description: "Instituto deletado com sucesso!",
      });
      await getInstitutes();
      handleCloseModalDelete();
    } catch (error) {
      showToastError({
        title: "Erro",
        description: "Erro ao deletar instituto!",
      });
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    allInstitutes,
    isModalOpen,
    defaultValues,
    dataIdModalInstitute,
    dataFormModalInstitute,
    deleteOpenModal,
    handleOpenModalCreate,
    handleCloseModalCreate,
    handleOpenModalEdit,
    handleCloseModalEdit,
    handleOpenModalDelete,
    handleCloseModalDelete,
    getInstitutes,
    postInstitute,
    putInstitute,
    deleteInsititute,
  };
}
