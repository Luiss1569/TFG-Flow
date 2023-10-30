import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <Flex align="center" justify="center" height="100vh" bg="gray.100">
      <Box textAlign="center">
        <Heading size="2xl" mb={4}>
          404 - Página não encontrada
        </Heading>
        <Button as={Link} to="/" colorScheme="blue">
          Voltar à página inicial
        </Button>
      </Box>
    </Flex>
  );
}
