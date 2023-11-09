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
import { optionsRole, optionsRoleTypeGrau } from "../../utils";
import { Grid, Margin, Wrapper } from "./styles";

interface ModalUsersProps {
  dataFormModalUser: FormDataUsers;
  handleCloseModal: () => void;
  handleCadastrar?: SubmitHandler<FormDataUsers>;
  isModalCreate?: boolean;
}

export function ModalUsers({
  dataFormModalUser,
  isModalCreate,
  handleCloseModal,
  handleCadastrar,
}: ModalUsersProps) {
  const { handleSubmit, register, watch } = useForm<FormDataUsers>({
    defaultValues: dataFormModalUser,
  });

  const selectedRole = watch("role"); // Obtenha o valor selecionado da função

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
              <Wrapper>
                {["professor", "coordenador"].includes(selectedRole) && (
                  <SelectComponent
                    label="Grau"
                    options={optionsRoleTypeGrau}
                    isRequired
                    {...register("university_degree")}
                  />
                )}
              </Wrapper>
            </Grid>
            <Margin>
              <InputComponent
                label="Nome"
                placeholder="Nome do usuário"
                isRequired
                {...register("name")}
              />
            </Margin>

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
            <Button mr={3} type="submit" color="#fff">
              Confirmar
            </Button>
            <ChakraButton type="button" onClick={handleCloseModal} color="#fff">
              Cancelar
            </ChakraButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
