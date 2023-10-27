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
import { SelectComponent } from "../../../../components/Select";
import { InputComponent } from "../../../../components/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { Grid, Wrapper } from "./styles";
import { defaultValues, optionsRole } from "../../utils";
import { optionsInstituteMock } from "../../mock";
import { FormDataUsers } from "../../types";

interface ModalUsersProps {
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalUsers({ isModalOpen, setModalOpen }: ModalUsersProps) {
  const { handleSubmit, register } = useForm<FormDataUsers>({
    defaultValues,
  });

  const handleCadastrar: SubmitHandler<FormDataUsers> = (data) => {
    console.log("Data submitted:", data);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      closeOnOverlayClick={false}
      size="xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastro de Usuários</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid>
            <SelectComponent
              label="Perfil"
              options={optionsRole}
              {...register("role")}
            />

            <InputComponent
              label="Nome"
              placeholder="Nome do usuário"
              {...register("name")}
            />
          </Grid>

          <Grid>
            <InputComponent
              label="Email"
              placeholder="exemplo@exemplo.com"
              {...register("email")}
            />
            <InputComponent
              label="CPF"
              placeholder="CPF do usuário"
              mask="999.999.999-99"
              {...register("cpf")}
            />
          </Grid>

          <Grid>
            <InputComponent
              label="Matricula"
              placeholder="Matrícula do usuário"
              {...register("matriculation")}
            />
            <SelectComponent
              label="Instituto"
              options={optionsInstituteMock}
              {...register("institute_id")}
            />
          </Grid>

          <Wrapper>
            <InputComponent
              label="Senha"
              placeholder="Senha"
              type="password"
              {...register("password")}
            />
            <InputComponent
              label="Confirmar Senha"
              placeholder="Confirmar Senha"
              type="password"
              {...register("confirmarSenha")}
            />
          </Wrapper>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={handleSubmit(handleCadastrar)}>
            Confirmar
          </Button>
          <ChakraButton onClick={handleCloseModal}>Cancelar</ChakraButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
