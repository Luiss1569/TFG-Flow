/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Button } from "../../components/Button";
import { ModalDelete } from "../../components/ModalDelete";
import { useInstitute } from "../../hooks/network/useInstitutes";
import { ModalInstitutes } from "./components/ModalInstitutes";
import { TableInstitutes } from "./components/TableInstitutes";
import { Container, Title, Wrapper, WrapperTable } from "./style";
import { SubmitHandler } from "react-hook-form";
import { IPostInstituteModel } from "../../services/InstitueService/dtos/IPostInstituteDTOResponse";
import { IPutInstituteModel } from "../../services/InstitueService/dtos/IPutInstituteDTOResponse";

export function Institutes() {
  const {
    loading,
    allInstitutes,
    dataFormModalInstitute,
    deleteOpenModal,
    dataIdModalInstitute,
    defaultValues,
    isModalOpen,
    getInstitutes,
    deleteInsititute,
    postInstitute,
    putInstitute,
    handleOpenModalCreate,
    handleOpenModalEdit,
    handleOpenModalDelete,
    handleCloseModalCreate,
    handleCloseModalEdit,
    handleCloseModalDelete,
  } = useInstitute();

  const isModalOpenCreate =
    isModalOpen && dataFormModalInstitute === defaultValues;
  const isModalOpenEdit =
    isModalOpen && dataFormModalInstitute !== defaultValues;
  const isModalOpenDelete = deleteOpenModal && dataIdModalInstitute !== "";

  const onSubmit: SubmitHandler<
    IPostInstituteModel | IPutInstituteModel
  > = async (data) => {
    if (isModalOpenCreate) {
      await postInstitute(data as IPostInstituteModel);
    } else {
      await putInstitute(data as IPutInstituteModel);
    }
  };

  useEffect(() => {
    getInstitutes();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Institutos</Title>
        <Button onClick={handleOpenModalCreate} color="#fff">
          Cadastrar
        </Button>
      </Wrapper>

      <WrapperTable>
        <TableInstitutes
          data={allInstitutes}
          loading={loading}
          handleEdit={handleOpenModalEdit}
          handleDelete={handleOpenModalDelete}
        />
      </WrapperTable>

      {isModalOpenCreate && (
        <ModalInstitutes
          handleCloseModal={handleCloseModalCreate}
          dataFormModalInstitute={dataFormModalInstitute}
          loading={loading}
          onSubmit={onSubmit}
          isModalCreate
        />
      )}

      {isModalOpenEdit && (
        <ModalInstitutes
          handleCloseModal={handleCloseModalEdit}
          dataFormModalInstitute={dataFormModalInstitute}
          loading={loading}
          onSubmit={onSubmit}
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
