import React, { memo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Stack,
  Text,
  Center,
  Box,
  Spinner,
  useToast,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { createSchema } from "../../lib/zod";
import api from "../../lib/axios";
import Form from "../../interfaces/Form";
import RenderInput from "../../components/RenderInput";
import ReturnButton from "../../components/ReturnButton";

const ResponseForm: React.FC = () => {
  const params = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const activity_id = location.state?.activity_id as string | undefined;

  const {
    data: form,
    isLoading,
    isError,
  } = useQuery<Form>(["form-slug", params.slug], async () => {
    const { data } = await api.get(`/form/slug/${params.slug}`).catch(() => {
      throw new Error("Form not found");
    });
    return data.body;
  });

  const schema = createSchema(form?.content.fields ?? []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading: isSubmitting } = useMutation(
    async (data: Record<string, string>) => {
      await api.post(`/form/${form?.id}/response`, {
        activity_id,
        content: data,
      });
    },
    {
      onSuccess: () => {
        toast({
          title: "Formulário enviado com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate(-1);
      },
      onError: () => {
        toast({
          title: "Erro ao enviar formulário",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.log("Form validation failed:", error);
    }
  });

  if (form?.form_type === "private" && !activity_id) {
    return (
      <Center h="100vh">
        <Box>
          <Text>Formulário sem atividade</Text>
          <Text>
            <ReturnButton mt="5" />
          </Text>
        </Box>
      </Center>
    );
  }

  if (isLoading) {
    return (
      <Center h="100vh" bg="gray.100">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center h="100vh" bg="gray.100">
        <Text>Formulário não encontrado ou não está mais disponível</Text>
      </Center>
    );
  }

  return (
    <Box bg="gray.100" p={4} minH="100vh">
      <ReturnButton mb={4} />
      <Center>
        <Box w="xl" bg="white" p={4} borderRadius="md" boxShadow="md">
          <Box mb={4}>
            <Text fontSize="2xl" fontWeight="bold">
              {form?.name}
            </Text>
            <Text>{form?.description}</Text>
            <Divider my={4} />
          </Box>

          <form onSubmit={onSubmit}>
            <Flex direction="column" align="center" justify="center" gap="3">
              <RenderInput
                fields={form?.content.fields ?? []}
                register={register}
                errors={errors}
                control={control}
              />

              <Stack direction="row" justifyContent="flex-end" mt={4}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={isSubmitting}
                >
                  Enviar
                </Button>
              </Stack>
            </Flex>
          </form>
        </Box>
      </Center>
    </Box>
  );
};

const MemoizedResponseForm = memo(ResponseForm);
export default MemoizedResponseForm;
