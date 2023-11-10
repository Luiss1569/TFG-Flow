import {
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
import { optionsRole, optionsRoleTypeGrau } from "../../utils";
import { Grid, Margin, Wrapper } from "./styles";
import { IPostUserModel } from "../../../../services/UserService/dtos/IPostUserDTOResponse";
import { IPutUserModel } from "../../../../services/UserService/dtos/IPutUserDTOResponse";
import { IInstituteModel } from "../../../../services/InstitueService/dtos/IGetInstituteDTOResponse";
import { EnumTypeUser } from "../../../../constants/enums";

interface ModalUsersProps {
  dataFormModalUser: IPostUserModel;
  isModalCreate?: boolean;
  loading: boolean;
  handleCloseModal: () => void;
  onSubmit: SubmitHandler<IPostUserModel | IPutUserModel>;
  institutes: IInstituteModel[];
}

export function ModalUsers({
  dataFormModalUser,
  isModalCreate = false,
  loading,
  onSubmit,
  handleCloseModal,
  institutes,
}: ModalUsersProps) {
  const { handleSubmit, register, watch } = useForm<IPostUserModel>({
    defaultValues: dataFormModalUser,
  });

  const role = watch("role");
  const isDegree =
    role === EnumTypeUser.COORDENADOR || role === EnumTypeUser.PROFESSOR;

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
        } User`}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Grid>
              <SelectComponent
                label="Perfil"
                options={optionsRole}
                isRequired={isModalCreate}
                disabled={loading}
                {...register("role")}
              />
              <Wrapper>
                <SelectComponent
                  label="Grau"
                  options={optionsRoleTypeGrau}
                  isRequired={isModalCreate && isDegree}
                  disabled={loading}
                  {...register("university_degree")}
                />
              </Wrapper>
            </Grid>
            <Margin>
              <InputComponent
                label="Nome"
                placeholder="Nome do usuário"
                isRequired={isModalCreate}
                disabled={loading}
                {...register("name")}
              />
            </Margin>

            <Grid>
              <InputComponent
                label="Email"
                type="email"
                placeholder="exemplo@exemplo.com"
                isRequired={isModalCreate}
                disabled={loading}
                {...register("email")}
              />
              <InputComponent
                label="CPF"
                placeholder="CPF do usuário"
                isRequired={isModalCreate}
                disabled={loading}
                {...register("cpf")}
              />
            </Grid>

            <Grid>
              <InputComponent
                label="Matricula"
                placeholder="Matrícula do usuário"
                isRequired={isModalCreate}
                disabled={loading}
                {...register("matriculation")}
              />
              <SelectComponent
                label="Instituto"
                options={institutes.map((institute) => ({
                  value: institute.id.toString(),
                  label: institute.name,
                }))}
                isRequired={isModalCreate}
                disabled={loading}
                {...register("institute_id")}
              />
            </Grid>

            <Wrapper>
              <InputComponent
                label="Senha"
                placeholder="Senha"
                type="password"
                isRequired={isModalCreate}
                disabled={loading}
                {...register("password")}
              />
              <InputComponent
                label="Confirmar Senha"
                placeholder="Confirmar Senha"
                type="password"
                isRequired={isModalCreate}
                disabled={loading}
                {...register("confirmPassword")}
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
