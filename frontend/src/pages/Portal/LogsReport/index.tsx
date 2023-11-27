import React, { useState } from 'react';
import { FormLabel, Box, Text, Table, FormControl, FormHelperText, Thead, Tr, Th, Input, Tbody, Td, Button, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../../lib/axios";
import { useEffect } from 'react';

const logFromSchema = z.object({
    days: z
        .string()
        .nonempty("O número de dias é obrigatório")
});

type CreateLogFormData = z.infer<typeof logFromSchema>;

interface LogData {
    id: number;
    content: string;
    created_at: string;
}

export default function LogTable() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<CreateLogFormData>({
        resolver: zodResolver(logFromSchema),
    });

    useEffect(() => {
        fetchData(getValues().days || '');
    }, []);

    const [dataLogs, setDataLogs] = useState<LogData[]>([]);

    const fetchData = async (days: any) => {
        try {
            const response = await api.get(`/report/logsReport/${days}`);
            console.log('chegou aqui');
            const data = response.data?.body.logsReports;
            console.log(data);
            console.log(typeof data);
            setDataLogs(data || []);
        } catch (error) {
            console.error('Error get:', error);
            setDataLogs([]);
        }
    };

    const onSubmit = async () => {
        const formValues = getValues();
        try {
            await fetchData(formValues.days);
        } catch (error) {
            console.error('Error get:', error);
            setDataLogs([]);
        }
    };
    return (
        <Box width="100%" p={5}>
            <Text
                mb={5}
                variant="title"
                w={{ base: "30%", xl: "40%" }}
                fontSize="3xl"
                fontWeight="semibold">Logs
            </Text>
            <form method='GET' onSubmit={handleSubmit((onSubmit))}>
                <FormControl mb={5} isInvalid={errors.days != null}>
                    <FormLabel htmlFor="days">Filtrar logs para os últimos:</FormLabel>
                    <Input
                        focusBorderColor="#3CB371"
                        errorBorderColor="red.300"
                        placeholder="Days"
                        id='days'
                        type="number"
                        {...register("days")}
                    />
                    {errors.days && (
                        <FormHelperText color="red">
                            {errors.days.message}
                        </FormHelperText>
                    )}

                </FormControl>
                <Button
                    type='submit'
                    rightIcon={<Icon as={BsFilter} />}>
                    Filtrar
                </Button>
            </form>
            <Table variant="striped" colorScheme="primary-color" >
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Data de criação</Th>
                        <Th>Descrição</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {dataLogs?.map(item => (
                        <Tr key={item.id} >
                            <Td>{item.id}</Td>
                            <Td>{item.created_at}</Td>
                            <Td>{item.content}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

