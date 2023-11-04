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
import { FormDataInstitutes } from "../../types";
import { Wrapper } from "./styles";

interface ModalInstituteProps {
  dataFormModalInstitute: FormDataInstitutes;
  handleCloseModal: () => void;
}

export function ModalInstitutes({
  dataFormModalInstitute,
  handleCloseModal,
}: ModalInstituteProps) {
  const { handleSubmit, register } = useForm<FormDataInstitutes>({
    defaultValues: dataFormModalInstitute,
  });

  const handleCadastrar: SubmitHandler<FormDataInstitutes> = (data) => {
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
        <ModalHeader>Cadastro de Instituto</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(handleCadastrar)}>
          <ModalBody>
            <Wrapper>
              <InputComponent
                label="Nome"
                placeholder="Nome do usuário"
                isRequired
                {...register("name")}
              />

              <InputComponent
                label="Instituto"
                placeholder="Sigla do instituto"
                isRequired
                {...register("acronym")}
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
