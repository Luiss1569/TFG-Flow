import React, { SyntheticEvent, useState, useContext, useEffect } from "react";
import "./style.css";
import api from "../../lib/axios";
import {
  useToast,
  IconButton,
  Link,
  InputLeftElement,
  FormControl,
  FormHelperText,
  Show,
  Hide,
  HStack,
  Button,
  Flex,
  Text,
  FormLabel,
  VStack,
  Input,
  Alert,
  AlertIcon,
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
} from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon, AtSignIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import AuthProvider, { AuthContext } from "../../contexts/AuthContext";

const loginUserFormSchema = z.object({
  cpf: z
    .string()
    .nonempty("O cpf é obrigatório")
    .regex(/^[0-9]{11}$/, "CPF inválido"),
  password: z.string().nonempty("A senha é obrigatória"),
});

type CreateUserFormData = z.infer<typeof loginUserFormSchema>;

function Login() {
  let navigate = useNavigate();
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

  const [errorText, setErrorText] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedCPF, setIsFocusedCPF] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);


  const showToastSuccess = () => {
    toast({
      title: "Login realizado com sucesso",
      description: "Sucesso",
      duration: 2500,
      isClosable: true,
      status: "success",
      position: "top-right",
      icon: <UnlockIcon />,
    });
  };
  const showToastError = (message: string) => {
    toast({
      title: "Erro ao realizar login",
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
                fontWeight="semibold"
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
                        <AtSignIcon color={isFocusedCPF ? "green_light" : "gray.400"} />
                      </InputLeftElement>
                      <Input
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
                  <FormControl isInvalid={errors.password != null} pt="10px">
                    <FormLabel htmlFor="password">Senha</FormLabel>

                    <InputGroup size="md">
                      <InputLeftElement pointerEvents="none">
                        <LockIcon color={isFocusedPassword ? "green_light" : "gray.400"} />
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
                  <Link color="green_light" href="/register">Cadastre-se</Link>
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
