import {
  Button as ChakraButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { Button } from "../../../../components/Button";
import { useMutation, useQueryClient } from "react-query";
import api from "../../../../lib/axios";
import { useCallback } from "react";

interface ModalDeleteProps {
  handleCloseModal: () => void;
  deleteOpenModal: boolean | string;
}

export function ModalDelete({
  handleCloseModal,
  deleteOpenModal,
}: ModalDeleteProps) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(
    async (id: string | boolean) => {
      const response = await api.delete(`/status/${id}`, {});

      if (response.data?.body) {
        handleCloseModal();
      }

      return response.data?.body;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("status");
        toast({
          title: "Excluído com sucesso",
          description: "O status foi excluído com sucesso",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: "Erro ao excluir",
          description: "Ocorreu um erro ao excluir o status",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );

  const onClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      !!deleteOpenModal && (await mutateAsync(deleteOpenModal));
    },
    [deleteOpenModal, mutateAsync]
  );

  return (
    <Modal
      isOpen={!!deleteOpenModal}
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
