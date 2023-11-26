import React, { memo } from "react";
import { Box, Heading, Flex, Divider } from "@chakra-ui/react";
import { LinkProps, Link as RouterLink } from "react-router-dom";

const Reportings: React.FC = () => {
  return (
    <Box p={4} minH="100vh" w="100%">
      <Heading mb={4}>Relatórios</Heading>
      <Divider />
      <Flex flexWrap="wrap" justifyContent="start" width="100%" gap={4} mt={5}>
        <ContentBox to="/portal/report-of-activities">
          <Heading fontSize="md">Relatório de Atividades</Heading>
        </ContentBox>
        <ContentBox to="/portal/logs">
          <Heading fontSize="md">Logs</Heading>
        </ContentBox>
        <ContentBox to="/workflows">
          <Heading fontSize="md">Workflows</Heading>
        </ContentBox>
      </Flex>
    </Box>
  );
};

export default Reportings;

interface ContentBoxProps extends LinkProps {}

const ContentBox: React.FC<ContentBoxProps> = memo(({ children, ...props }) => {
  return (
    <RouterLink {...props}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={3}
        width="300px"
        boxShadow="lg"
        backgroundColor="gray.100"
        _hover={{ borderColor: "green.500" }}
      >
        {children}
      </Box>
    </RouterLink>
  );
});
