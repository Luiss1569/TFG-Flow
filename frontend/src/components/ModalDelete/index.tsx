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
import { Button } from "../Button";

interface ModalDeleteProps {
  handleCloseModal: () => void;
  deleteOpenModal: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export function ModalDelete({
  handleCloseModal,
  deleteOpenModal,
  onClick,
}: ModalDeleteProps) {
  return (
    <Modal
      isOpen={deleteOpenModal}
      onClose={handleCloseModal}
      closeOnOverlayClick={false}
      size="xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent style={{ marginTop: "3%" }}>
        <ModalHeader>Excluir</ModalHeader>
        <hr />
        <ModalCloseButton />
        <ModalBody>Tem certeza de que deseja excluir?</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            type="submit"
            onClick={onClick}
            color="#fff"
          >
            Confirmar
          </Button>
          <ChakraButton type="button" onClick={handleCloseModal} color="#fff">
            Cancelar
          </ChakraButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
