import {
  FormLabel,
  Box,
  Text,
  Table,
  FormControl,
  FormHelperText,
  Thead,
  Tr,
  Th,
  Input,
  Tbody,
  Td,
  Button,
  Icon,
} from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../../lib/axios";
import { useQuery } from "react-query";
import LogsData, { LogReport } from "../../../interfaces/logsReport";

const logFromSchema = z.object({
  days: z.number().int().positive().min(1).max(30).optional(),
});

type CreateLogFormData = z.infer<typeof logFromSchema>;

export default function LogTable() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateLogFormData>({
    resolver: zodResolver(logFromSchema),
  });

  const days = watch("days");

  const {
    data: dataLogs,
    isLoading,
    isError,
    error,
    refetch: fetchData,
  } = useQuery<LogsData>(["logs", days], async () => {
    const response = await api.get(`/report/logsReport/${days ?? 7}`);

    return response.data.body;
  });

  const onSubmit = async () => {
    try {
      await fetchData();
    } catch (error) {
      console.error("Error get:", error);
    }
  };

  if (isError) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <Box width="100%" p={5}>
      <Text
        mb={5}
        variant="title"
        w={{ base: "30%", xl: "40%" }}
        fontSize="3xl"
        fontWeight="semibold"
      >
        Logs
      </Text>
      <form method="GET" onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={5} isInvalid={errors.days != null}>
          <FormLabel htmlFor="days">Filtrar logs para os últimos:</FormLabel>
          <Input
            focusBorderColor="#3CB371"
            errorBorderColor="red.300"
            placeholder="Days"
            id="days"
            type="number"
            {...register("days")}
          />
          {errors.days && (
            <FormHelperText color="red">{errors.days.message}</FormHelperText>
          )}
        </FormControl>
        <Button
          type="submit"
          rightIcon={<Icon as={BsFilter} />}
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          Filtrar
        </Button>
      </form>
      <Table variant="striped" colorScheme="primary-color">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Usuário</Th>
            <Th>Function</Th>
            <Th>Content</Th>
            <Th>Data de criação</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataLogs?.logsReports?.map((item: LogReport) => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{dataLogs.usersMap[item.user_id]?.name ?? "-"}</Td>
              <Td>{item.function}</Td>
              <Td>{JSON.stringify(item.content, null, 2)}</Td>
              <Td>{new Date(item.created_at).toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
