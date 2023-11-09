import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Flex align="center" justify="center" height="100vh" bg="gray.100">
      <Box textAlign="center">
        <Heading size="2xl" mb={4}>
          404 - Página não encontrada
        </Heading>
        <Button onClick={handleBack} colorScheme="blue">
          Voltar à página inicial
        </Button>
      </Box>
    </Flex>
  );
}
