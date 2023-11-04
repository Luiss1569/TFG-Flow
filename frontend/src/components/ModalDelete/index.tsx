import React from "react";
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
  id: number; // Adicione o tipo correto para o ID
  onConfirmDelete: (id: number) => void; // Adicione a função de confirmação com o ID
}

export function ModalDelete({
  handleCloseModal,
  deleteOpenModal,
  id,
  onConfirmDelete,
}: ModalDeleteProps) {
  const handleConfirmDelete = () => {
    // Lógica adicional de exclusão se necessário
    console.log("Data", id);
    // Chame a função de confirmação com o ID
    onConfirmDelete(id);
    // Fechar o modal
    handleCloseModal();
  };

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
            onClick={handleConfirmDelete}
          >
            Confirmar
          </Button>
          <ChakraButton type="button" onClick={handleCloseModal}>
            Cancelar
          </ChakraButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
