/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { Button } from "../../../components/Button";
import { ModalDelete } from "./components/ModalDelete";
import { ModalForm } from "./components/ModalForm";
import { TableForm } from "./components/TableForm";
import { Container, Title, Wrapper, WrapperTable } from "./style";
import { useQuery } from "react-query";
import api from "../../../lib/axios";
import Form from "../../../interfaces/Form";
import Status from "../../../interfaces/Status";

export default function FormsPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deleteOpenModal, setDeleteOpenModal] = useState<string | null>(null);
  const [dataFormModalForm, setDataFormModalForm] = useState<Form | null>(null);

  const { data: forms, isLoading: loading } = useQuery<Form[]>(
    "forms",
    async () => {
      const response = await api.get("/forms");
      return response.data?.body.map((form: Form) => ({
        ...form,
        formOpenPeriod: form?.formOpenPeriod?.map((period) => ({
          ...period,
          start_date: new Date(period.start_date).toISOString().split("T")[0],
          end_date: new Date(period.end_date).toISOString().split("T")[0],
        })),
      }));
    }
  );

  const { data: status } = useQuery<Status[]>("status", async () => {
    const response = await api.get("/status");
    return response.data?.body;
  });

  const isModalOpenCreate = isModalOpen && dataFormModalForm === null;
  const isModalOpenEdit = isModalOpen && dataFormModalForm !== null;
  const isModalOpenDelete = deleteOpenModal !== null;

  const handleOpenModalCreate = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleOpenModalEdit = useCallback((data: Form) => {
    setIsModalOpen(true);
    setDataFormModalForm(data);
  }, []);

  const handleOpenModalDelete = useCallback((id: string) => {
    setDeleteOpenModal(id);
  }, []);

  const handleCloseModalCreate = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCloseModalEdit = useCallback(() => {
    setIsModalOpen(false);
    setDataFormModalForm(null);
  }, []);

  const handleCloseModalDelete = useCallback(() => {
    setDeleteOpenModal(null);
  }, []);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <Container>
      <Wrapper>
        <Title>Formulário</Title>
        <Button onClick={handleOpenModalCreate} color="#fff">
          Cadastrar
        </Button>
      </Wrapper>

      <WrapperTable>
        <TableForm
          data={forms ?? []}
          loading={loading}
          handleEdit={handleOpenModalEdit}
          handleDelete={handleOpenModalDelete}
        />
      </WrapperTable>

      {isModalOpenCreate && (
        <ModalForm
          handleCloseModal={handleCloseModalCreate}
          loading={loading}
          status={status ?? []}
          isModalCreate
        />
      )}

      {isModalOpenEdit && (
        <ModalForm
          handleCloseModal={handleCloseModalEdit}
          loading={loading}
          status={status ?? []}
          dataFormModalForm={dataFormModalForm}
        />
      )}

      {isModalOpenDelete && (
        <ModalDelete
          deleteOpenModal={deleteOpenModal}
          handleCloseModal={handleCloseModalDelete}
        />
      )}
    </Container>
  );
}
