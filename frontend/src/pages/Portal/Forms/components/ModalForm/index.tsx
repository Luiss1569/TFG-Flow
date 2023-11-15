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
  Checkbox,
  FormControl,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import {
  Control,
  UseFormRegister,
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
import { FaTrash } from "react-icons/fa";
import { memo, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import Status from "../../../../../interfaces/Status";

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
                onChange={(e) => {
                  setValue("form_type", e.target.value as "private" | "public");
                  setIsPublic(e.target.value === "public");
                }}
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
                />
              )}

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
                disabled={loading}
                {...register("formOpenPeriod.0.start_date")}
              />
              <InputComponent
                type="date"
                label="Data de fim"
                placeholder="Data de fim"
                disabled={loading}
                {...register("formOpenPeriod.0.end_date")}
              />
              <Heading as="h6" fontSize="lg">
                Campos
              </Heading>
              {fields.map((field, index) => (
                <Box
                  key={field.id}
                  mb="2rem"
                  p="1rem"
                  border="1px solid gray"
                  borderRadius="lg"
                >
                  <InputComponent
                    label="Digite o identificador do campo"
                    placeholder="ID"
                    {...register(`content.fields.${index}.id`, {
                      required: true,
                    })}
                  />
                  <InputComponent
                    label="Digite o label do campo"
                    placeholder="Label"
                    {...register(`content.fields.${index}.label`, {
                      required: true,
                    })}
                  />

                  <SelectComponent
                    label="Digite o tipo do campo"
                    placeholder="Tipo"
                    options={[
                      { label: "Text", value: "text" },
                      { label: "Number", value: "number" },
                      { label: "Date", value: "date" },
                      { label: "Email", value: "email" },
                      { label: "Password", value: "password" },
                      { label: "Textarea", value: "textarea" },
                      { label: "Select", value: "select" },
                      { label: "Multi Select", value: "multiselect" },
                      { label: "Radio", value: "radio" },
                      { label: "Checkbox", value: "checkbox" },
                      { label: "File", value: "file" },
                    ]}
                    {...register(`content.fields.${index}.type`, {
                      required: true,
                    })}
                  />

                  {["select", "multiselect", "radio", "checkbox"].includes(
                    getValues(`content.fields.${index}.type`)
                  ) && (
                    <FieldOptionsMenu
                      index={index}
                      {...{ register, control }}
                    />
                  )}

                  <InputComponent
                    label="Digite o placeholder do campo"
                    placeholder="Placeholder"
                    {...register(`content.fields.${index}.placeholder`)}
                  />

                  <FormControl>
                    <Checkbox
                      type="checkbox"
                      {...register(`content.fields.${index}.required`)}
                    >
                      <FormLabel htmlFor="required">Obrigatorio</FormLabel>
                    </Checkbox>
                  </FormControl>

                  <FormControl>
                    <Checkbox
                      type="checkbox"
                      {...register(`content.fields.${index}.visible`)}
                    >
                      <FormLabel htmlFor="visible">Visível</FormLabel>
                    </Checkbox>
                  </FormControl>

                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    color="#fff"
                  >
                    <FaTrash />
                  </Button>
                </Box>
              ))}

              <button
                type="button"
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

interface OptionFieldProps {
  index: number;
  register: UseFormRegister<Form>;
  control: Control<Form>;
}

const FieldOptionsMenu = memo(
  ({ index, control, register }: Readonly<OptionFieldProps>) => {
    const {
      fields: optionFields,
      append: appendOption,
      remove: removeOption,
    } = useFieldArray({
      control,
      name: `content.fields.${index}.options`,
    });

    return (
      <Box my="sm">
        <Heading as="h6" fontSize="md">
          Opções
        </Heading>
        <SelectComponent
          label="Tipo especial?"
          options={[{ label: "Professores", value: "teacher" }]}
          {...register(`content.fields.${index}.especial_type`)}
        />
        {optionFields.map((optionField, optionIndex) => (
          <Box key={optionField.id} mb="2rem" p="1rem" border="1px solid gray">
            <InputComponent
              label="Digite o valor da opção"
              type="text"
              {...register(
                `content.fields.${index}.options.${optionIndex}.label`
              )}
            />
            <InputComponent
              label="Digite o valor da opção"
              type="text"
              {...register(
                `content.fields.${index}.options.${optionIndex}.value`
              )}
            />

            <Button
              type="button"
              onClick={() => removeOption(optionIndex)}
              color="#fff"
            >
              <FaTrash />
            </Button>
          </Box>
        ))}
        <Button
          type="button"
          onClick={() => appendOption({ value: "", label: "" })}
        >
          <MdOutlineAdd color="white" />
        </Button>
      </Box>
    );
  }
);
