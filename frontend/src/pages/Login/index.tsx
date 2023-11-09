/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AtSignIcon,
  LockIcon,
  MoonIcon,
  SunIcon,
  UnlockIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Hide,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../lib/axios";
import "./style.css";

const loginUserFormSchema = z.object({
  cpf: z
    .string()
    .nonempty("O cpf é obrigatório")
    .regex(/^[0-9]{11}$/, "CPF inválido"),
  password: z.string().nonempty("A senha é obrigatória"),
});

type CreateUserFormData = z.infer<typeof loginUserFormSchema>;

function Login() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
  });

  const [show, setShow] = useState(false);

  const handleToastClose = () => {
    return navigate("/");
  };
  const showToastSuccess = () => {
    toast({
      title: "login sucesso",
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
      title: "Erro no login",
      description: `${message}`,
      duration: 2500,
      isClosable: true,
      status: "error",
      position: "top-right",
      icon: <LockIcon />,
    });
  };

  const handleClick = () => setShow(!show);
  const loginUser = async (data: any) => {
    try {
      const cpf = data.cpf;
      const password = data.password;
      const response = await api.post("login", {
        cpf,
        password,
      });

      if (response.data.status === 200) {
        showToastSuccess();
        authContext?.setToken(response.data?.body?.token);
        navigate("/portal");
      } else throw new Error(response.data.message);
    } catch (error: any) {
      showToastError(error.message);
    }
  };

  useEffect(() => {
    if (authContext?.token) {
      navigate("/portal");
    }
  }, [authContext?.token, navigate]);

  return (
    <Box bg="primary">
      <Center>
        <Stack>
          <HStack h="100vh" justifyContent="center">
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
            <Hide below="md">
              <Text
                variant="title"
                w={{ base: "30%", xl: "40%" }}
                fontSize="5xl"
              >
                Faça o login para acessar sua conta
              </Text>
            </Hide>

            <Card bg="secondary" p="10">
              <CardBody>
                <form onSubmit={handleSubmit(loginUser)}>
                  <FormControl isInvalid={errors.cpf != null}>
                    <FormLabel htmlFor="cpf">CPF</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <AtSignIcon />
                      </InputLeftElement>
                      <Input
                        focusBorderColor="#3CB371"
                        errorBorderColor="red.300"
                        bg="primary"
                        id="cpf"
                        placeholder="Digite seu CPF"
                        type="text"
                        {...register("cpf")}
                      />
                    </InputGroup>

                    {errors.cpf && (
                      <FormHelperText color="red">
                        {errors.cpf.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl isInvalid={errors.password != null} pt="10px">
                    <FormLabel htmlFor="password">Senha</FormLabel>

                    <InputGroup size="md">
                      <InputLeftElement pointerEvents="none">
                        <LockIcon />
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
                  <Button
                    isLoading={isSubmitting}
                    mt="1rem"
                    type="submit"
                    variant="solid"
                    w="100%"
                  >
                    Entrar
                  </Button>
                </form>

                <Text align="center" pt="20px">
                  Ainda não possuí uma conta?{" "}
                  <Link color="green_light">Cadastre-se</Link>
                </Text>
              </CardBody>
            </Card>
          </HStack>
        </Stack>
      </Center>
    </Box>
  );
}

export default Login;
