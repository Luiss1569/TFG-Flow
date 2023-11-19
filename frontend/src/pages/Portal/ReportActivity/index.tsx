import React, { memo, useMemo } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import api from "../../../lib/axios";
import ActivitiesReport from "../../../interfaces/ActivitiesReport";
import {
  Box,
  Flex,
  Heading,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Thead,
  TableContainer,
  Spinner,
  Button,
  Link,
  Icon,
} from "@chakra-ui/react";
import LineChart from "../../../components/Charts/LineChart";
import BarChartComponent from "../../../components/Charts/BarChart";
import ActivityResponse, { Activity } from "../../../interfaces/Activity";
import { Link as RouterLink } from "react-router-dom";
import { FaArrowAltCircleRight, FaEye } from "react-icons/fa";

const ReportActivity: React.FC = () => {
  const { data: report, isLoading } = useQuery<ActivitiesReport>(
    "report-activity",
    async () => {
      const response = await api.get("/report/activity");
      return response.data?.body;
    }
  );
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Box w="100%">
      <Heading>Relatório de Atividades</Heading>

      <Box
        p={4}
        mt={4}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        w="100%"
        bg="white"
      >
        <Flex
          p={4}
          mt={4}
          borderWidth={1}
          borderRadius={8}
          boxShadow="sm"
          justifyContent={"space-between"}
          alignItems={"center"}
          direction={"row"}
          gap={4}
        >
          <Box>
            <Heading as="h3" size="sm" fontWeight="normal">
              Total de atividades
            </Heading>
            <Heading as="h4" size="md" color="green.500">
              {report?.totalActivities}
            </Heading>
          </Box>
          <Box>
            <Heading as="h3" size="sm" fontWeight="normal">
              Criadas nas últimas 24 horas
            </Heading>
            <Heading as="h4" size="md" textAlign="end" color="green.500">
              {report?.totalActivitiesLast24Hours}
            </Heading>
          </Box>
        </Flex>

        <Flex wrap="wrap" mt={4}>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            direction={"column"}
            gap={4}
          >
            <Heading size="md">Atividades criadas nos últimos 7 dias</Heading>
            <LineChart
              width={500}
              height={300}
              data={report?.activitiesLast7Days ?? []}
              xKey="date"
              yKey="count"
            />
          </Flex>

          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            direction={"column"}
            gap={4}
          >
            <Heading size="md">Atividades por Status</Heading>
            <BarChartComponent
              width={500}
              height={300}
              data={report?.activitiesPerStatus ?? []}
              xKey="status"
              yKey="count"
            />
          </Flex>
        </Flex>
        <TableActivities />
      </Box>
    </Box>
  );
};

export default ReportActivity;
const fetchActivities = async ({ pageParam = 1 }) => {
  const response = await api.get(`/activities?page=${pageParam}`);
  return response.data?.body;
};

const TableActivities = memo(() => {
  const {
    data: response,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery<ActivityResponse>("activities", fetchActivities, {
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ? lastPage.nextPage : false;
    },
  });
  const activities = useMemo(() => {
    return response?.pages?.flatMap((page) => page.activities) ?? [];
  }, [response]);

  if (isLoading) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box overflowX="auto">
      <TableContainer>
        <Table variant="striped" mt={4}>
          <Thead bg="green.100">
            <Tr>
              <Th>Nome</Th>
              <Th>Matrícula</Th>
              <Th>Usuário</Th>
              <Th>Status</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {activities?.map((activity: Activity) => (
              <Tr key={activity.id}>
                <Td>{activity.name}</Td>
                <Td>#{activity.matriculation}</Td>
                <Td>{activity.users.name}</Td>
                <Td>{activity.status.name}</Td>
                <Td>
                  <Link
                    as={RouterLink}
                    to={`/portal/activity/${activity.id}/details`}
                    display="flex"
                    alignItems="center"
                    mr={4}
                  >
                    <Icon as={FaEye} />
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justifyContent="end" alignItems="center" mt={4} px={"1rem"}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          mt={4}
          px={"1rem"}
          gap={4}
        >
          <span>
            Página <strong>{response?.pages?.at(-1)?.page ?? 0}</strong> de{" "}
            <strong>{response?.pages?.[0]?.total ?? 0}</strong>
          </span>
          <Button
            onClick={() => fetchNextPage()}
            isDisabled={!hasNextPage || isFetchingNextPage}
            isLoading={isFetchingNextPage}
          >
            <Icon as={FaArrowAltCircleRight} />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
});
