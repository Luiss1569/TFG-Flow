import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Heading,
  useToast,
} from "@chakra-ui/react";
import {
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Button } from "../../../../../components/Button";
import { InputComponent } from "../../../../../components/Input";
import { Wrapper } from "./styles";
import api from "../../../../../lib/axios";
import { useMutation, useQueryClient } from "react-query";
import Form from "../../../../../interfaces/Form";
import { SelectComponent } from "../../../../../components/Select";
import Status from "../../../../../interfaces/Status";
import FieldForms from "../../../../../components/FieldForm";
import { useState } from "react";

interface ModalInstituteProps {
  isModalCreate?: boolean;
  loading: boolean;
  handleCloseModal: () => void;
  dataFormModalForm?: Form;
  status: Status[] | [];
}

export function ModalForm({
  isModalCreate = false,
  loading,
  handleCloseModal,
  dataFormModalForm,
  status,
}: Readonly<ModalInstituteProps>) {
  const [isPublic, setIsPublic] = useState<boolean>(
    dataFormModalForm?.form_type === "public"
  );

  const { handleSubmit, register, control, getValues, setValue } =
    useForm<Form>({
      defaultValues: dataFormModalForm,
    });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "content.fields",
  });

  const queryClient = useQueryClient();
  const toast = useToast();

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
          description: "O forms foi salvo com sucesso",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: "Erro ao salvar",
          description: "Ocorreu um erro ao forms o status",
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
        <form onSubmit={onSubmit} id="form-form">
          <ModalBody>
            <Wrapper>
              <InputComponent
                label="Nome"
                placeholder="Nome do usuário"
                isRequired={isModalCreate}
                disabled={loading}
                {...register("name")}
                id="name"
              />
              <InputComponent
                label="Slug"
                placeholder="Slug do usuário"
                isRequired={isModalCreate}
                disabled={loading}
                {...register("slug")}
                id="slug"
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
                onChange={(e) => {
                  setValue("form_type", e.target.value as "private" | "public");
                  setIsPublic(e.target.value === "public");
                }}
                id="form_type"
              />

              {isPublic && (
                <SelectComponent
                  label="Status"
                  options={
                    status?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    })) ?? []
                  }
                  isRequired={isModalCreate}
                  disabled={loading}
                  {...register("status_id")}
                  id="status_id"
                />
              )}

              <InputComponent
                label="Descrição"
                placeholder="Descrição do usuário"
                isRequired={isModalCreate}
                disabled={loading}
                {...register("description")}
                id="description"
              />
              <InputComponent
                type="date"
                label="Data de início"
                placeholder="Data de início"
                disabled={loading}
                {...register("formOpenPeriod.0.start_date")}
                id="start_date"
              />
              <InputComponent
                type="date"
                label="Data de fim"
                placeholder="Data de fim"
                disabled={loading}
                {...register("formOpenPeriod.0.end_date")}
                id="end_date"
              />
              <Heading as="h6" fontSize="lg">
                Campos
              </Heading>
              {fields.map((field, index) => (
                <FieldForms
                  key={field.id}
                  {...{ field, index, register, control, getValues, remove, setValue }}
                />
              ))}

              <button
                type="button"
                id="add-field"
                onClick={() =>
                  append({
                    id: `campo#${fields.length + 1}`,
                    label: "",
                    type: "",
                    placeholder: "",
                    required: false,
                    visible: false,
                    value: "",
                    zod: {
                      type: "string",
                      validation: {},
                    },
                    options: [],
                  })
                }
              >
                Add
              </button>
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

export default ModalForm;
