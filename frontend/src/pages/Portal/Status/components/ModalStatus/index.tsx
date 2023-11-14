import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Button } from "../../../../../components/Button";
import { InputComponent } from "../../../../../components/Input";
import { Wrapper } from "./styles";
import Status from "../../../../../interfaces/Status";
import api from "../../../../../lib/axios";
import { useMutation, useQueryClient } from "react-query";

interface ModalInstituteProps {
  isModalCreate?: boolean;
  loading: boolean;
  handleCloseModal: () => void;
  dataFormModalStatus?: Status;
}

export function ModalStatus({
  isModalCreate = false,
  loading,
  handleCloseModal,
  dataFormModalStatus,
}: Readonly<ModalInstituteProps>) {
  const { handleSubmit, register } = useForm<Status>({
    defaultValues: dataFormModalStatus,
  });

  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutateAsync } = useMutation(
    async (data: Status) => {
      const method = isModalCreate ? "post" : "put";
      const id = !isModalCreate ? `/${data.id}` : "";
      const response = await api[method](`/status${id}`, data);

      if (response.data?.body) {
        handleCloseModal();
      }

      return response.data?.body;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("status");
        toast({
          title: "Salvo com sucesso",
          description: "O status foi salvo com sucesso",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: "Erro ao salvar",
          description: "Ocorreu um erro ao salvar o status",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Modal
      isOpen
      onClose={loading ? () => {} : handleCloseModal}
      closeOnOverlayClick={false}
      size="xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`${
          isModalCreate ? "Cadastrar" : "Editar"
        } Instituto`}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSubmit}>
          <ModalBody>
            <Wrapper>
              <InputComponent
                label="Nome"
                placeholder="Nome do usuário"
                isRequired={isModalCreate}
                disabled={loading}
                {...register("name")}
              />
            </Wrapper>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} type="submit" color="#fff" isLoading={loading}>
              Confirmar
            </Button>
            <Button
              type="button"
              isDisabled={loading}
              onClick={handleCloseModal}
              color="#fff"
            >
              Cancelar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
