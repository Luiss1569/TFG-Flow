/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { Button } from "../../../components/Button";
import { ModalDelete } from "./ModalDelete";
import { ModalStatus } from "./components/ModalStatus";
import { TableStatus } from "./components/TableStatus";
import { Container, Title, Wrapper, WrapperTable } from "./style";
import { useQuery } from "react-query";
import api from "../../../lib/axios";
import Status from "../../../interfaces/Status";

export default function StatusPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deleteOpenModal, setDeleteOpenModal] = useState<string | null>(null);
  const [dataFormModalStatus, setDataFormModalStatus] = useState<Status | null>(
    null
  );

  const { data: status, isLoading: loading } = useQuery<Status[]>(
    "status",
    async () => {
      const response = await api.get("/status");
      return response.data?.body;
    }
  );

  const isModalOpenCreate = isModalOpen && dataFormModalStatus === null;
  const isModalOpenEdit = isModalOpen && dataFormModalStatus !== null;
  const isModalOpenDelete = deleteOpenModal !== null;

  const handleOpenModalCreate = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleOpenModalEdit = useCallback((data: Status) => {
    setIsModalOpen(true);
    setDataFormModalStatus(data);
  }, []);

  const handleOpenModalDelete = useCallback((id: string) => {
    setDeleteOpenModal(id);
  }, []);

  const handleCloseModalCreate = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCloseModalEdit = useCallback(() => {
    setIsModalOpen(false);
    setDataFormModalStatus(null);
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
        <Title>Status</Title>
        <Button onClick={handleOpenModalCreate} color="#fff" id="btn-create">
          Cadastrar
        </Button>
      </Wrapper>

      <WrapperTable>
        <TableStatus
          data={status ?? []}
          loading={loading}
          handleEdit={handleOpenModalEdit}
          handleDelete={handleOpenModalDelete}
        />
      </WrapperTable>

      {isModalOpenCreate && (
        <ModalStatus
          handleCloseModal={handleCloseModalCreate}
          loading={loading}
          isModalCreate
        />
      )}

      {isModalOpenEdit && (
        <ModalStatus
          handleCloseModal={handleCloseModalEdit}
          loading={loading}
          dataFormModalStatus={dataFormModalStatus}
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
