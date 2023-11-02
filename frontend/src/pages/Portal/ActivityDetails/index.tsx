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
import { formatDate } from "../../../lib/utils";
import FileItem from "../../../components/FileItem";

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
          minWidth={"80%"}
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
              <Flex wrap={"wrap"} gap={2} alignItems={"center"}>
                <Heading as="h1" fontSize="2xl">
                  {activity?.name}
                </Heading>
                <Text fontSize="xl">#{activity?.matriculation}</Text>
              </Flex>
              <Badge colorScheme="green" p={2} borderRadius="sm">
                {activity?.status.name}
              </Badge>
            </Flex>
            <VStack mb={4} align="start">
              <LabelText
                label={"Data de Criação"}
                text={formatDate(activity?.created_at)}
              />
              <LabelText
                label={"Última Atualização"}
                text={formatDate(activity?.updated_at)}
              />
              <Divider mb={2} />
              <Text fontWeight={"bold"} fontSize="md">
                Aluno
              </Text>
              <LabelText label={"Nome"} text={activity?.users.name ?? ""} />
              <LabelText label={"Email"} text={activity?.users.email ?? ""} />
              <LabelText
                label={"Matrícula"}
                text={activity?.users.matriculation ?? ""}
              />
              <Divider />
              <Text fontWeight={"bold"} fontSize="md" mb={1}>
                Campos extras
              </Text>
              {activity?.answered.map((field) => (
                <>
                  {typeof field.value === "object" ? (
                    <FileItem
                      name={field.value.name}
                      mimeType={field.value.mimeType}
                      url={field.value.url}
                      label={field.label}
                    />
                  ) : (
                    <LabelText
                      key={field.id}
                      label={field.label}
                      text={field.value}
                    />
                  )}
                </>
              ))}
            </VStack>
          </Box>
          <VStack align="start" mb={4}>
            <Heading fontWeight={"bold"} fontSize="xl" mb={2}>
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
                  <Text fontWeight={"bold"} fontSize="md" mb={2}>
                    {mastermind.teacher.user.name}
                  </Text>
                  <Text fontSize="sm" mb={2}>
                    {mastermind.teacher.user.email}
                  </Text>
                </Box>
              ))}
            </Flex>
          </VStack>
          <Divider mb={4} />
          <VStack align="start">
            <Heading as="h2" fontSize="xl" mb={4}>
              Fluxo de atividades
            </Heading>
            <Box>
              {activity?.activityWorkflow?.map((workflow) => (
                <>
                  <MilestoneItem key={workflow.id}>
                    <Heading as="h6" fontSize={"lg"} mb={2} mt={3}>
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
                        <Text fontSize="md" mb={2}>
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
                <Flex key={answeredField.id} mb={2} direction={"column"}>
                  <Text fontSize="sm" mr={2}>
                    {answeredField.label}:
                  </Text>

                  {typeof answeredField.value === "object" ? (
                    <FileItem
                      name={answeredField.value.name}
                      mimeType={answeredField.value.mimeType}
                      url={answeredField.value.url}
                    />
                  ) : (
                    <Text fontSize="sm" fontWeight={"bold"}>
                      {answeredField.value}
                    </Text>
                  )}
                </Flex>
              ))}
              <Divider mb={2} mt={2} />
              <Badge
                colorScheme="gray.100"
                p={1}
                borderRadius="sm"
                textTransform={"none"}
              >
                {userRequestAnswer.user.name} - {userRequestAnswer.user.email}
              </Badge>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
});

const LabelText = memo(({ label, text }: { label: string; text: string }) => {
  return (
    <Flex direction={"column"}>
      <Text fontSize="sm" mr={2}>
        {label}:
      </Text>
      <Text fontSize="sm" fontWeight={"bold"}>
        {text}
      </Text>
    </Flex>
  );
});
