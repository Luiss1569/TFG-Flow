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
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import {
  Dashboard,
  Form,
  Activity,
  RequestForm,
} from "../../../interfaces/Dashboard";
import { BiLinkExternal } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { formatDate } from "../../../lib/utils";
import { BsCalendarX } from "react-icons/bs";

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
      <Accordion allowToggle defaultIndex={[0, 1, 2, 3]} mt={5}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text fontSize="xl">Formulários Abertos</Text>
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
                <Text fontSize="xl">Requisições de Interação</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            {dashboard?.request.map((request: RequestForm) => (
              <RequestBox key={request.request_answer_id} request={request} />
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
                <Text fontSize="xl">Minhas Atividades</Text>
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

        {!!dashboard?.teacher_activities && (
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Text fontSize="xl">Minhas Orientações</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              {dashboard?.teacher_activities.map((activity: Activity) => (
                <ActivityBox key={activity.id} activity={activity} />
              ))}

              {dashboard?.teacher_activities.length === 0 && (
                <Text fontSize="md">Nenhuma atividade encontrada</Text>
              )}
            </AccordionPanel>
          </AccordionItem>
        )}
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
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      display="flex"
      alignItems="center"
      mb={4}
      _hover={{ borderColor: "green.500" }}
    >
      <Flex w="100%" justifyContent="space-between">
        <div>
          <Text fontSize="lg" fontWeight="bold">
            {form.name}
          </Text>
          <Text mt={4}>{form.description}</Text>
        </div>
        <Flex>
          {!!form.formOpenPeriod?.length && (
            <Tag colorScheme="gray.100" mr={4}>
              <TagLeftIcon boxSize="12px" as={BsCalendarX} />
              <TagLabel>
                {formatDate(form.formOpenPeriod?.at(-1)?.end_date)}
              </TagLabel>
            </Tag>
          )}
          <Link
            as={RouterLink}
            to={`/response/${form.slug}`}
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
    _hover={{ borderColor: "green.500" }}
  >
    <Flex w="100%" justifyContent="space-between" direction="row">
      <Flex direction="row" justifyContent="center" align="baseline" gap="2">
        <Text fontSize="lg" fontWeight="bolder">
          {activity.name}
        </Text>
        <Text mt={4} opacity=".7" fontSize="md">
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
    <Text fontSize="sm">Criado em: {formatDate(activity.created_at)}</Text>
  </Box>
));

interface RequestBoxProps {
  request: RequestForm;
}

const RequestBox = memo(({ request }: RequestBoxProps) => {
  const { request_answer } = request;
  const { activity, form } = request_answer;

  return (
    <Box
      key={form.id}
      py={3}
      px={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      display="flex"
      alignItems="center"
      mb={4}
      _hover={{ borderColor: "green.500" }}
    >
      <Flex w="100%" justifyContent="space-between">
        <div>
          <Text fontSize="lg" fontWeight="bold">
            {form.name}
          </Text>
          <Text mt={4}>{form.description}</Text>

          <Divider my={4} w="100%" />
          <Flex direction="row" mt={4} gap={1} alignItems="baseline">
            <Text fontSize="md">Atividade:</Text>
            <Text fontSize="md" fontWeight="bolder">
              {activity.name}
            </Text>
            <Text fontSize="md">#{activity.matriculation}</Text>
          </Flex>
        </div>
        <Flex>
          <Link
            as={RouterLink}
            to={`/portal/activity/${activity.id}/details`}
            display="flex"
            alignItems="center"
            mr={4}
          >
            <Icon as={FaEye} />
          </Link>
          {!!form.formOpenPeriod?.length && (
            <Tag colorScheme="gray.100" mr={4}>
              <TagLeftIcon boxSize="12px" as={BsCalendarX} />
              <TagLabel>
                {formatDate(form.formOpenPeriod?.at(-1)?.end_date)}
              </TagLabel>
            </Tag>
          )}
          <Link
            as={RouterLink}
            to={`/response/${form.slug}`}
            state={{ activity_id: activity.id }}
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
