import React, { memo } from "react";
import { useQuery } from "react-query";
import api from "../../../lib/axios";
import {
  Center,
  Spinner,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
  Link,
  Icon,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { Dashboard, Form } from "../../../interfaces/Dashboard";
import { BiLinkExternal } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const { data: dashboard, isLoading } = useQuery<Dashboard>(
    "dashboard",
    async () => {
      const response = await api.get("/dashboard");

      return response.data?.body;
    }
  );

  if (isLoading)
    return (
      <Center h="100vh" w="100%">
        <Spinner size="xl" />
      </Center>
    );

  return (
    <Accordion allowToggle w="100%" defaultIndex={[0, 1]}>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Formulários Abertos
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          {dashboard?.public.map((form: Form) => (
            <FormBox key={form.id} form={form} />
          ))}

          {dashboard?.public.length === 0 && (
            <Text fontSize="md">Nenhum formulário encontrado</Text>
          )}
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Requisições de Interação
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          {dashboard?.request.map((form: Form) => (
            <FormBox key={form.id} form={form} />
          ))}

          {dashboard?.request.length === 0 && (
            <Text fontSize="md">Nenhum formulário encontrado</Text>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default DashboardPage;

interface FormBoxProps {
  form: Form;
}

const FormBox = memo(({ form }: FormBoxProps) => {
  return (
    <Box
      key={form.id}
      py={3}
      px={5}
      shadow="sm"
      borderWidth="1px"
      borderRadius="lg"
      display="flex"
      alignItems="center"
    >
      <Flex w="100%" justifyContent="space-between">
        <div>
          <Text fontSize="xl">{form.name}</Text>
          <Text mt={4}>{form.description}</Text>
          {!!form.requestAnswers?.length && (
            <>
              <Divider my={4} w="100%" />
              <Text>Nome: {form.requestAnswers.at(-1)?.activity.name}</Text>
              <Text>
                Matricula: {form.requestAnswers.at(-1)?.activity.matriculation}
              </Text>
            </>
          )}
        </div>
        <Flex>
          {!!form.requestAnswers?.length && (
            <Link
              as={RouterLink}
              to={`/portal/activity/${
                form.requestAnswers.at(-1)?.activity.id
              }/details`}
              display="flex"
              alignItems="center"
              mr={4}
            >
              <Icon as={FaEye} />
            </Link>
          )}
          <Link
            as={RouterLink}
            to={`/response/${form.slug}`}
            state={{ activity_id: form?.requestAnswers?.at(-1)?.activity.id }}
            display="flex"
            alignItems="center"
            mr={4}
          >
            <Icon as={BiLinkExternal} />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
});
