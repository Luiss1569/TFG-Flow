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
import api from "../../../../../lib/axios";
import { useMutation, useQueryClient } from "react-query";
import Form from "../../../../../interfaces/Form";
import { SelectComponent } from "../../../../../components/Select";

interface ModalInstituteProps {
  isModalCreate?: boolean;
  loading: boolean;
  handleCloseModal: () => void;
  dataFormModalForm?: Form;
}

export function ModalForm({
  isModalCreate = false,
  loading,
  handleCloseModal,
  dataFormModalForm,
}: Readonly<ModalInstituteProps>) {
  const { handleSubmit, register } = useForm<Form>({
    defaultValues: dataFormModalForm,
  });

  const queryClient = useQueryClient();
  const toast = useToast();

  console.log(dataFormModalForm);

  const { mutateAsync } = useMutation(
    async (data: Form) => {
      const method = isModalCreate ? "post" : "put";
      const id = !isModalCreate ? `/${data.id}` : "";
      const response = await api[method](`/form${id}`, data);

      if (response.data?.body) {
        handleCloseModal();
      }

      return response.data?.body;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("forms");
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
        } Formulário`}</ModalHeader>
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
              <InputComponent
                label="Slug"
                placeholder="Slug do usuário"
                isRequired={isModalCreate}
                disabled={loading}
                {...register("slug")}
              />
              <SelectComponent
                label="Tipo"
                options={[
                  {
                    label: "Privado",
                    value: "private",
                  },
                  {
                    label: "Público",
                    value: "public",
                  },
                ]}
                isRequired={isModalCreate}
                disabled={loading}
                {...register("form_type")}
              />
              <InputComponent
                label="Descrição"
                placeholder="Descrição do usuário"
                isRequired={isModalCreate}
                disabled={loading}
                {...register("description")}
              />
              <InputComponent
                type="date"
                label="Data de início"
                placeholder="Data de início"
                isRequired={isModalCreate}
                disabled={loading}
                {...register("formOpenPeriod.0.start_date")}
              />
              <InputComponent
                type="date"
                label="Data de fim"
                placeholder="Data de fim"
                isRequired={isModalCreate}
                disabled={loading}
                {...register("formOpenPeriod.0.end_date")}
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
