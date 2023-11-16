import { useState } from "react";
import api from "../../lib/axios";
import {
  Icon,
  Select,
  CardHeader,
  Heading,
  useToast,
  IconButton,
  Link,
  InputLeftElement,
  FormControl,
  FormHelperText,
  Hide,
  HStack,
  Button,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  useColorMode,
  Box,
  Center,
  Stack,
  Card,
  CardBody,
} from "@chakra-ui/react";
import {
  SunIcon,
  MoonIcon,
  ViewIcon,
  ViewOffIcon,
  UnlockIcon,
  ArrowBackIcon,
} from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon, AtSignIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { MdEmail, MdPerson } from "react-icons/md";
import { IoMdDocument } from "react-icons/io";
import { Institute } from "../../interfaces/Institute";

const registerUserFormSchema = z
  .object({
    institute_id: z.string().nonempty("O Nome é obrigatório"),
    name: z.string().nonempty("O Nome é obrigatório"),
    matriculation: z.string().nonempty("A Matricula é obrigatório"),
    email: z.string().nonempty("O email é obrigatório"),
    cpf: z
      .string()
      .nonempty("O cpf é obrigatório")
      .regex(/^[0-9]{11}$/, "CPF inválido"),
    password: z.string().nonempty("A senha é obrigatória"),
    passwordconfirm: z.string().nonempty("Confirmação de senha é obrigatório"),
  })
  .refine(({ password, passwordconfirm }) => password === passwordconfirm, {
    message: "As senhas não correspondem",
    path: ["passwordconfirm"],
  });

type CreateUserFormData = z.infer<typeof registerUserFormSchema>;
//ts-ignore
function Register() {
  const { data: institutes } = useQuery<Institute[]>("institute", async () => {
    const response = await api.get("/institute");
    return response.data?.body;
  });
  const navigate = useNavigate();

  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(registerUserFormSchema),
  });

  const [show, setShow] = useState(false);
  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isFocusedCPF, setIsFocusedCPF] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedMatriculation, setIsFocusedMatriculation] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedPasswordConfirm, setIsFocusedPasswordConfirm] =
    useState(false);

  const handleToastClose = () => {
    return navigate("/");
  };
  const showToastSuccess = () => {
    toast({
      title: "Cadastrado com sucesso",
      description: "Sucesso",
      duration: 2500,
      isClosable: true,
      status: "success",
      position: "top-right",
      icon: <UnlockIcon />,
      onCloseComplete: handleToastClose,
    });
  };
  const showToastError = (message: string) => {
    toast({
      title: "Erro no cadastro",
      description: `${message}`,
      duration: 2500,
      isClosable: true,
      status: "error",
      position: "top-right",
      icon: <LockIcon />,
    });
  };

  const handleClick = () => setShow(!show);

  const registerUser = async (data: CreateUserFormData) => {
    try {
      await api.post("users", {
        ...data,
        role: "student",
      });
      showToastSuccess();
      navigate("/");
    } catch (error) {
    //@ts-ignore
      showToastError(error.message);
    }
  };

  return (
    <Box bg="primary">
      <Center>
        <Stack width="60%">
          <HStack h="100vh" justifyContent="space-between" spacing="5%">
            <IconButton
              aria-label="toggle theme"
              rounded="full"
              size="xs"
              position="absolute"
              bottom={4}
              left={4}
              onClick={toggleColorMode}
              icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            />

            <Card bg="secondary" p="10">
              <CardHeader pb={3}>
                <Heading size="md">Cadastro de usuário</Heading>
              </CardHeader>
              <CardBody>
                <form onSubmit={handleSubmit(registerUser)}>
                  <FormControl isInvalid={errors.name != null} mb={3}>
                    {/* <FormLabel htmlFor="name" >Nome</FormLabel> */}
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon
                          as={MdPerson}
                          color={isFocusedName ? "green_light" : "gray.400"}
                        />
                      </InputLeftElement>
                      <Input
                        width="330px"
                        focusBorderColor="#3CB371"
                        errorBorderColor="red.300"
                        bg="primary"
                        id="name"
                        placeholder="Digite seu Nome"
                        type="text"
                        {...register("name")}
                        onFocus={() => setIsFocusedName(true)}
                        onBlur={() => setIsFocusedName(false)}
                      />
                    </InputGroup>

                    {errors.name && (
                      <FormHelperText color="red">
                        {errors.name.message}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl isInvalid={errors.cpf != null} mb={3}>
                    {/* <FormLabel htmlFor="cpf" >CPF</FormLabel> */}
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <AtSignIcon
                          color={isFocusedCPF ? "green_light" : "gray.400"}
                        />
                      </InputLeftElement>
                      <Input
                        width="330px"
                        focusBorderColor="#3CB371"
                        errorBorderColor="red.300"
                        bg="primary"
                        id="cpf"
                        placeholder="Digite seu CPF"
                        type="text"
                        {...register("cpf")}
                        onFocus={() => setIsFocusedCPF(true)}
                        onBlur={() => setIsFocusedCPF(false)}
                      />
                    </InputGroup>

                    {errors.cpf && (
                      <FormHelperText color="red">
                        {errors.cpf.message}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl isInvalid={errors.email != null} mb={3}>
                    {/* <FormLabel htmlFor="email" >Email</FormLabel> */}
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon
                          as={MdEmail}
                          color={isFocusedEmail ? "green_light" : "gray.400"}
                        />
                      </InputLeftElement>
                      <Input
                        width="330px"
                        focusBorderColor="#3CB371"
                        errorBorderColor="red.300"
                        bg="primary"
                        id="email"
                        placeholder="Digite seu Email"
                        type="text"
                        {...register("email")}
                        onFocus={() => setIsFocusedEmail(true)}
                        onBlur={() => setIsFocusedEmail(false)}
                      />
                    </InputGroup>

                    {errors.email && (
                      <FormHelperText color="red">
                        {errors.email.message}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl isInvalid={errors.matriculation != null} mb={3}>
                    {/* <FormLabel htmlFor="matriculation" >Matricula</FormLabel> */}
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon
                          as={IoMdDocument}
                          color={
                            isFocusedMatriculation ? "green_light" : "gray.400"
                          }
                        />
                      </InputLeftElement>
                      <Input
                        width="330px"
                        focusBorderColor="#3CB371"
                        errorBorderColor="red.300"
                        bg="primary"
                        id="matriculation"
                        placeholder="Digite sua Matricula"
                        type="text"
                        {...register("matriculation")}
                        onFocus={() => setIsFocusedMatriculation(true)}
                        onBlur={() => setIsFocusedMatriculation(false)}
                      />
                    </InputGroup>

                    {errors.matriculation && (
                      <FormHelperText color="red">
                        {errors.matriculation.message}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl isInvalid={errors.password != null} mb={3}>
                    {/* <FormLabel htmlFor="password" >Senha</FormLabel> */}

                    <InputGroup size="md">
                      <InputLeftElement pointerEvents="none">
                        <LockIcon
                          color={isFocusedPassword ? "green_light" : "gray.400"}
                        />
                      </InputLeftElement>
                      <Input
                        bg="primary"
                        focusBorderColor="#3CB371"
                        errorBorderColor="red.300"
                        variant="outline"
                        id="password"
                        placeholder="Digite sua senha"
                        type={show ? "text" : "password"}
                        {...register("password")}
                        onFocus={() => setIsFocusedPassword(true)}
                        onBlur={() => setIsFocusedPassword(false)}
                      />

                      <InputRightElement width="4.5rem">
                        {show && (
                          <ViewIcon onClick={handleClick} color="green_light" />
                        )}
                        {!show && (
                          <ViewOffIcon
                            onClick={handleClick}
                            color="green_light"
                          ></ViewOffIcon>
                        )}
                      </InputRightElement>
                    </InputGroup>
                    {errors.password && (
                      <FormHelperText color="red">
                        {errors.password.message}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl
                    isInvalid={errors.passwordconfirm != null}
                    mb={3}
                  >
                    {/* <FormLabel htmlFor="password" >Confirme sua senha</FormLabel> */}

                    <InputGroup size="md">
                      <InputLeftElement pointerEvents="none">
                        <LockIcon
                          color={
                            isFocusedPasswordConfirm
                              ? "green_light"
                              : "gray.400"
                          }
                        />
                      </InputLeftElement>
                      <Input
                        bg="primary"
                        focusBorderColor="#3CB371"
                        errorBorderColor="red.300"
                        variant="outline"
                        id="password"
                        placeholder="Confirme sua senha"
                        type={show ? "text" : "password"}
                        {...register("passwordconfirm")}
                        onFocus={() => setIsFocusedPasswordConfirm(true)}
                        onBlur={() => setIsFocusedPasswordConfirm(false)}
                      />

                      <InputRightElement width="4.5rem">
                        {show && (
                          <ViewIcon onClick={handleClick} color="green_light" />
                        )}
                        {!show && (
                          <ViewOffIcon
                            onClick={handleClick}
                            color="green_light"
                          ></ViewOffIcon>
                        )}
                      </InputRightElement>
                    </InputGroup>
                    {errors.passwordconfirm && (
                      <FormHelperText color="red">
                        {errors.passwordconfirm.message}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl isInvalid={errors.institute_id != null} mb={3}>
                    <InputGroup>
                      <Select
                        bg="primary"
                        color="gray.500"
                        focusBorderColor="#3CB371"
                        placeholder="Selecione um instituto"
                        {...register("institute_id")}
                      >
                        {institutes?.map(
                          (item: { id: string; name: string }) => (
                            <option
                              key={item.id}
                              value={item.id}
                              className="custom-option"
                            >
                              {item.name}
                            </option>
                          )
                        )}
                      </Select>
                    </InputGroup>
                  </FormControl>

                  <Button
                    isLoading={isSubmitting}
                    mt="1rem"
                    type="submit"
                    variant="solid"
                    w="100%"
                  >
                    Cadastrar
                  </Button>
                </form>
              </CardBody>
            </Card>
            <Hide below="md">
              <Box maxW="400px" pt="10" pb="10">
                <Text fontSize="3xl" fontWeight="bold">
                  Gerenciamento do Fluxo de Atividades
                </Text>
                <Text fontSize="lg" mt={10}>
                  Monitore o progresso de suas atividades, acompanhe cada etapa
                  e visualize o processo completo de cada uma, seja Trabalho de
                  Conclusão de Curso (TCC), estágio, atividades complementares
                  ou outras.{" "}
                </Text>
                <Text fontSize="sm" mt={10} mb={10}>
                  Entre em contato com seu coordenador para mais informações.{" "}
                </Text>
                <Link color="green_light" fontSize="sm" href="/">
                  <ArrowBackIcon />
                  Voltar para o login
                </Link>
              </Box>
            </Hide>
          </HStack>
        </Stack>
      </Center>
    </Box>
  );
}

export default Register;
