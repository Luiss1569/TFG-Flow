import React, { useState } from "react";
import { Button } from "../../components/Button";
import { ModalInstitutes } from "./components/ModalInstitutes";
import { TableInstitutes } from "./components/TableInstitutes";
import { arrayInstitutesMock } from "./mock";
import { Container, Title, Wrapper, WrapperTable } from "./style";
import { FormDataInstitutes, ITableInstitutes } from "./types";
import { defaultValues } from "./utils";
import { ModalDelete } from "../../components/ModalDelete";

export function Institutes() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [dataFormModalInstitute, setDataFormModalInstitute] =
    useState<FormDataInstitutes>(defaultValues);

  const [deleteOpenModal, setDeleteOpenModal] = useState(false);
  const [dataIdModalInstitute, setIdModalInstitute] = useState<number>(null);

  const isModalOpenCreate =
    isModalOpen && dataFormModalInstitute === defaultValues;
  const isModalOpenEdit =
    isModalOpen && dataFormModalInstitute !== defaultValues;

  const isModalOpenDelete = deleteOpenModal && dataIdModalInstitute !== null;

  const handleOpenModal = () => setModalOpen(true);

  const handleCloseModal = () => {
    setDataFormModalInstitute(defaultValues);
    setModalOpen(false);
  };

  const handleEdit = (dataTable: ITableInstitutes) => {
    setDataFormModalInstitute({
      ...dataTable,
    });
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setDeleteOpenModal(true);
    setIdModalInstitute(id);
  };

  const handleCloseModalDelete = () => {
    setDeleteOpenModal(false);
    setIdModalInstitute(null);
  };

  const handleConfirmDelete = (id: number) => {
    console.log("Excluir instituto id", id);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Institutos</Title>
        <Button onClick={handleOpenModal}>Cadastrar</Button>
      </Wrapper>

      <WrapperTable>
        <TableInstitutes
          data={arrayInstitutesMock}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </WrapperTable>

      {isModalOpenCreate && (
        <ModalInstitutes
          handleCloseModal={handleCloseModal}
          dataFormModalInstitute={dataFormModalInstitute}
        />
      )}

      {isModalOpenEdit && (
        <ModalInstitutes
          handleCloseModal={handleCloseModal}
          dataFormModalInstitute={dataFormModalInstitute}
        />
      )}

      {isModalOpenDelete && (
        <ModalDelete
          handleCloseModal={handleCloseModalDelete}
          deleteOpenModal={deleteOpenModal}
          id={dataIdModalInstitute}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
    </Container>
  );
}
