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
import { IPostInstituteModel } from "../../../../services/InstitueService/dtos/IPostInstituteDTOResponse";
import { IPutInstituteModel } from "../../../../services/InstitueService/dtos/IPutInstituteDTOResponse";
import { Wrapper } from "./styles";

interface ModalInstituteProps {
  dataFormModalInstitute: IPostInstituteModel;
  isModalCreate?: boolean;
  loading: boolean;
  handleCloseModal: () => void;
  onSubmit: SubmitHandler<IPostInstituteModel | IPutInstituteModel>;
}

export function ModalInstitutes({
  dataFormModalInstitute,
  isModalCreate = false,
  loading,
  onSubmit,
  handleCloseModal,
}: ModalInstituteProps) {
  const { handleSubmit, register } = useForm<IPostInstituteModel>({
    defaultValues: dataFormModalInstitute,
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
                label="Sigla"
                placeholder="Sigla do instituto"
                isRequired={isModalCreate}
                disabled={loading}
                {...register("acronym")}
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
