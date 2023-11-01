import React, { memo } from "react";
import {
  Badge,
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import api from "../../../lib/axios";
import { ActivityDetails, RequestAnswer } from "../../../interfaces/Activity";
import { MilestoneEnd, MilestoneItem } from "../../../components/TimeLine";
import ReturnButton from "../../../components/ReturnButton";

const formatDate = (date: string | undefined) => {
  if (!date) {
    return "";
  }

  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const ActivityDetailsComponent: React.FC = () => {
  const params = useParams<{ id: string }>();

  const {
    data: activity,
    isError,
    isLoading,
  } = useQuery<ActivityDetails>(["activity", params.id], async () => {
    const response = await api.get(`/activity/${params.id}`);
    return response.data?.body;
  });

  if (isLoading) {
    return (
      <Center h="100vh" w="100%">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center h="100vh" w="100%">
        Erro ao carregar atividade
      </Center>
    );
  }
  return (
    <Box p={4} minH="100vh" w="100%">
      <ReturnButton mb={4} />
      <Center>
        <Box
          p={4}
          bg="white"
          borderRadius="2xl"
          minWidth={"60%"}
          boxShadow={"lg"}
        >
          <Box mb={4} borderWidth="1px" borderRadius="lg" p={4}>
            <Flex
              wrap={"wrap"}
              gap={5}
              mb={4}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Heading as="h1" size="lg">
                {activity?.name}
              </Heading>
              <Badge colorScheme="green" p={2} borderRadius="sm">
                {activity?.status.name}
              </Badge>
            </Flex>
            <VStack mb={4} align="start">
              <Text>Nª de Matrícula: {activity?.matriculation}</Text>
              <Text>Criação: {formatDate(activity?.created_at)}</Text>
              <Text>
                Última Atualização: {formatDate(activity?.updated_at)}
              </Text>
              <Divider mb={2} />
              <Text fontWeight={"bold"} size="lg" mb={1}>
                Aluno
              </Text>
              <Text>Matrícula: {activity?.users.matriculation}</Text>
              <Text size="md">Nome: {activity?.users.name}</Text>
              <Text>Email: {activity?.users.email}</Text>
              <Divider mb={2} />
              <Text fontWeight={"bold"} size="lg" mb={1}>
                Campos extras
              </Text>
              {activity?.answered.map((field) => (
                <Text mb={2}>
                  {field.label}: {field.value}
                </Text>
              ))}
            </VStack>
          </Box>
          <VStack align="start" mb={4}>
            <Heading fontWeight={"bold"} size="lg" mb={2}>
              Orientadores
            </Heading>
            <Flex flexWrap="wrap" gap={4}>
              {activity?.masterminds.map((mastermind) => (
                <Box
                  key={mastermind.teacher.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  p={4}
                  mb={4}
                >
                  <Text fontWeight={"bold"} size="md" mb={2}>
                    {mastermind.teacher.user.name}
                  </Text>
                  <Text mb={2}>{mastermind.teacher.user.email}</Text>
                </Box>
              ))}
            </Flex>
          </VStack>
          <Divider mb={4} />
          <VStack align="start">
            <Heading as="h2" size="lg" mb={4}>
              Fluxo de atividades
            </Heading>
            <Box>
              {activity?.activityWorkflow?.map((workflow) => (
                <>
                  <MilestoneItem key={workflow.id}>
                    <Heading as="h6" size={"md"} mb={2} mt={3}>
                      {workflow.workflow.status.name}
                    </Heading>
                  </MilestoneItem>

                  {workflow?.activityworkflowSteps?.map((step) => (
                    <MilestoneItem key={step.id} isStep>
                      <Box
                        border={"1px"}
                        borderColor={"gray.200"}
                        px={4}
                        py={3}
                        borderRadius="lg"
                      >
                        <Text fontWeight={"bold"} size="md" mb={2}>
                          {step.step.name}
                        </Text>
                        {!!step.requestAnswers?.length && (
                          <RequestAnswerItem
                            requestAnswers={step.requestAnswers}
                          />
                        )}
                      </Box>
                    </MilestoneItem>
                  ))}
                </>
              ))}
              <MilestoneEnd isStep skipTrail></MilestoneEnd>
            </Box>
          </VStack>
        </Box>
      </Center>
    </Box>
  );
};

const ActivityDetailsMemo = memo(ActivityDetailsComponent);

export default ActivityDetailsMemo;

interface RequestAnswerProps {
  requestAnswers: RequestAnswer[];
}

const RequestAnswerItem = memo(({ requestAnswers }: RequestAnswerProps) => {
  return (
    <Box p={4} bg="gray.100" borderRadius="lg" mb={4}>
      {requestAnswers.map((requestAnswer) => (
        <Box key={requestAnswer.id}>
          {requestAnswer.userRequestAnswers.map((userRequestAnswer) => (
            <Box key={userRequestAnswer.answer_id}>
              {userRequestAnswer.answered.map((answeredField) => (
                <Flex key={answeredField.id} mb={2}>
                  <Text fontWeight={"bold"} size="sm" mr={2}>
                    {answeredField.label}:
                  </Text>
                  <Text size="sm">{answeredField.value}</Text>
                </Flex>
              ))}
              <Divider mb={2} mt={2} />
              <Badge colorScheme="gray.100" p={1} borderRadius="sm" textTransform={"none"}>
                {userRequestAnswer.user.name} - {userRequestAnswer.user.email}
              </Badge>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
});
