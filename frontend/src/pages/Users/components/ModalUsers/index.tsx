import {
  Button as ChakraButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { InputComponent } from "../../../../components/Input";
import { SelectComponent } from "../../../../components/Select";
import { optionsInstituteMock } from "../../mock";
import { FormDataUsers } from "../../types";
import { optionsRole } from "../../utils";
import { Grid, Wrapper } from "./styles";

interface ModalUsersProps {
  dataFormModalUser: FormDataUsers;
  handleCloseModal: () => void;
  isModalCreate?: boolean;
}

export function ModalUsers({
  dataFormModalUser,
  isModalCreate,
  handleCloseModal,
}: ModalUsersProps) {
  const { handleSubmit, register } = useForm<FormDataUsers>({
    defaultValues: dataFormModalUser,
  });

  const handleCadastrar: SubmitHandler<FormDataUsers> = (data) => {
    console.log("Data submitted:", data);
    handleCloseModal();
  };

  return (
    <Modal
      isOpen
      onClose={handleCloseModal}
      closeOnOverlayClick={false}
      size="xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastro de Usuário</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(handleCadastrar)}>
          <ModalBody>
            <Grid>
              <SelectComponent
                label="Perfil"
                options={optionsRole}
                isRequired
                {...register("role")}
              />

              <InputComponent
                label="Nome"
                placeholder="Nome do usuário"
                isRequired
                {...register("name")}
              />
            </Grid>

            <Grid>
              <InputComponent
                label="Email"
                type="email"
                placeholder="exemplo@exemplo.com"
                isRequired
                {...register("email")}
              />
              <InputComponent
                label="CPF"
                placeholder="CPF do usuário"
                isRequired
                // mask="999.999.999-99"
                {...register("cpf")}
              />
            </Grid>

            <Grid>
              <InputComponent
                label="Matricula"
                placeholder="Matrícula do usuário"
                isRequired
                {...register("matriculation")}
              />
              <SelectComponent
                label="Instituto"
                options={optionsInstituteMock}
                isRequired
                {...register("institute_id")}
              />
            </Grid>

            <Wrapper>
              <InputComponent
                label="Senha"
                placeholder="Senha"
                type="password"
                isRequired={isModalCreate}
                {...register("password")}
              />
              <InputComponent
                label="Confirmar Senha"
                placeholder="Confirmar Senha"
                type="password"
                isRequired={isModalCreate}
                {...register("confirmPassword")}
              />
            </Wrapper>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} type="submit">
              Confirmar
            </Button>
            <ChakraButton type="button" onClick={handleCloseModal}>
              Cancelar
            </ChakraButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
