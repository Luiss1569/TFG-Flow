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
  Tag,
} from "@chakra-ui/react";
import { Dashboard, Form, Activity } from "../../../interfaces/Dashboard";
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
    <Box w="100%">
      <Text fontSize="4xl" fontWeight="bold">
        Dashboard
      </Text>

      <Accordion allowToggle defaultIndex={[0, 1]} mt={5}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontSize="2xl" fontWeight="bold">
                  Formulários Abertos
                </Text>
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
                <Text fontSize="2xl" fontWeight="bold">
                  Requisições de Interação
                </Text>
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

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontSize="2xl" fontWeight="bold">
                  Minhas Atividades
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            {dashboard?.activities.map((activity: Activity) => (
              <ActivityBox key={activity.id} activity={activity} />
            ))}

            {dashboard?.activities.length === 0 && (
              <Text fontSize="md">Nenhuma atividade encontrada</Text>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
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
      mb={4}
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

interface ActivityBoxProps {
  activity: Activity;
}

const ActivityBox = memo(({ activity }: ActivityBoxProps) => (
  <Box
    key={activity.id}
    py={3}
    px={5}
    shadow="sm"
    borderWidth="1px"
    borderRadius="lg"
    display="flex"
    flexDirection="column"
    mb={4}
  >
    <Flex w="100%" justifyContent="space-between" direction="row">
      <Flex direction="row" justifyContent="center" align="baseline" gap="2">
        <Text fontSize="xl">{activity.name}</Text>
        <Text mt={4} opacity=".7">
          #{activity.matriculation}
        </Text>
      </Flex>
      <Flex direction="row" justifyContent="center" align="center" gap="2">
        <Tag ml={4} colorScheme="green">
          {activity.status.name}
        </Tag>
        <Link
          as={RouterLink}
          to={`/portal/activity/${activity.id}/details`}
          display="flex"
          alignItems="center"
          mr={4}
        >
          <Icon as={FaEye} />
        </Link>
      </Flex>
    </Flex>
    <Divider my={4} w="100%" />
    <Text size="sm">Criado em: {activity.created_at}</Text>
  </Box>
));
