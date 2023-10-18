import React, { memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";
import { createSchema } from "../../lib/zod";
import api from "../../lib/axios";
import Form from "../../interfaces/Form";
import RenderInput from "../../components/RenderInput";

const ResponseForm: React.FC = () => {
  const params = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const { data: form, isLoading } = useQuery<Form>(
    ["form-slug", params.slug],
    async () => {
      const { data } = await api.get(`/form/slug/${params.slug}`).catch(() => {
        throw new Error("Form not found");
      });
      return data.body;
    }
  );

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
      await api.post(`/formss/${form?.id}/response`, data);
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

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box bg="gray.100" p={4} minH="100vh">
      <Center>
        <Box w="xl" bg="white" p={4} borderRadius="md" boxShadow="md">
          <Text fontSize="2xl" mb={4}>
            {form?.content.name}
          </Text>

          <form onSubmit={onSubmit}>
            <RenderInput
              fields={form?.content.fields ?? []}
              register={register}
              errors={errors}
              control={control}
            />

            <Stack direction="row" justifyContent="flex-end" mt={4}>
              <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
                Enviar
              </Button>
            </Stack>
          </form>
        </Box>
      </Center>
    </Box>
  );
};

const MemoizedResponseForm = memo(ResponseForm);
export default MemoizedResponseForm;
