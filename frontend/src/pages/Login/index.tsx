import React, { SyntheticEvent, useState } from 'react';
import './style.css';
import api from "../../lib/axios";
import { useToast, IconButton, Link, InputLeftElement, FormControl, FormHelperText, Show, HStack, Button, Flex, Text, FormLabel, VStack, Input, Alert, AlertIcon, InputGroup, InputRightElement, useColorMode, Box, Center, Stack, Card, CardBody } from '@chakra-ui/react';
import { SunIcon, MoonIcon, ViewIcon, ViewOffIcon, UnlockIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LockIcon, AtSignIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";

const loginUserFormSchema = z.object({
    cpf: z.string()
        .nonempty('O cpf é obrigatório')
        .regex(/^[0-9]{11}$/, 'CPF inválido'),
    password: z.string()
        .nonempty('A senha é obrigatória')
})

type CreateUserFormData = z.infer<typeof loginUserFormSchema>

function Login() {
    let navigate = useNavigate();

    const { colorMode, toggleColorMode } = useColorMode();
    const toast = useToast();

    const { register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateUserFormData>({
        resolver: zodResolver(loginUserFormSchema),
    });

    const [errorText, setErrorText] = useState<string | null>(null);
    const [show, setShow] = useState(false)

    const handleToastClose =()=>{
        return navigate("/");
    }
    const showToastSuccess = () =>{
        toast({
            title:'login sucesso',
            description: 'Sucesso',
            duration: 2500,
            isClosable: true,
            status: 'success',
            position: 'top-right',
            icon: <UnlockIcon/>,
            onCloseComplete: handleToastClose
        });
    }
    const showToastError = (message: string) =>{
        toast({
            title:'Erro no login',
            description: `${message}`,
            duration: 2500,
            isClosable: true,
            status: 'error',
            position: 'top-right',
            icon: <LockIcon/>
        });
    }

    const handleClick = () => setShow(!show)
    const loginUser = async (data: any) => {
        try {
            const cpf = data.cpf;
            const password = data.password;
            console.log(cpf, password);
            await api.post("login", {
                cpf,
                password
            });
            showToastSuccess();
        } catch (error: any) {
            showToastError(error.message);
        }
    };

   
    return (
        <Box bg='primary'>
            <Center>
                <Stack >
                    <HStack h="100vh" justifyContent='center'>
                        {errorText && (
                            <Alert status='error' color='error' pos="fixed" top="0" left="0" >
                                <AlertIcon />
                                {errorText}
                            </Alert>
                        )}
                        <IconButton
                            aria-label="toggle theme"
                            rounded="full"
                            size="xs"
                            position="absolute"
                            bottom={4}
                            left={4}
                            onClick={toggleColorMode} icon={colorMode === "dark" ? <SunIcon/> : <MoonIcon />}
                        />
                            {/* <Show breakpoint='(min-width: 800px)' > */}
                                <Text variant='title' w={{ base: '10%', xl: '40%' }} fontSize='5xl' >Faça o login para acessar sua conta</Text>
                            {/* </Show> */}
                            <Card bg='secondary' p='10'>
                                <CardBody>
                                    <form onSubmit={handleSubmit(loginUser)}>
                                        <FormControl isInvalid={errors.cpf != null}>
                                            <FormLabel htmlFor="cpf" >CPF</FormLabel>
                                            <InputGroup>
                                                <InputLeftElement pointerEvents='none'>
                                                    <AtSignIcon />
                                                </InputLeftElement>
                                                <Input
                                                    focusBorderColor='#3CB371'
                                                    errorBorderColor='red.300'
                                                    bg='primary'
                                                    id="cpf"
                                                    placeholder="Digite seu CPF"
                                                    type='text'
                                                    {...register('cpf')}
                                                />
                                            </InputGroup>

                                            {errors.cpf && <FormHelperText >{errors.cpf.message}</FormHelperText>}

                                        </FormControl>
                                        <FormControl isInvalid={errors.password != null}>
                                            <FormLabel htmlFor="password" >Senha</FormLabel>

                                            <InputGroup size='md'>
                                                <InputLeftElement pointerEvents='none'>
                                                    <LockIcon />
                                                </InputLeftElement>
                                                <Input
                                                    bg='primary'
                                                    focusBorderColor='#3CB371'
                                                    variant='outline'
                                                    id="password"
                                                    placeholder="Digite sua senha"
                                                    type={show ? 'text' : 'password'}
                                                    {...register('password')}
                                                />

                                                <InputRightElement width='4.5rem'>
                                                    {show && (
                                                        <ViewIcon onClick={handleClick} color='green_light' />
                                                    )}
                                                    {!show && (
                                                        <ViewOffIcon onClick={handleClick} color='green_light'></ViewOffIcon>
                                                    )}
                                                </InputRightElement>

                                            </InputGroup>
                                            {errors.password && <FormHelperText >{errors.password.message}</FormHelperText>}

                                        </FormControl>
                                        <Button isLoading={isSubmitting}
                                            mt='1rem'
                                            type='submit'
                                            // _hover={{ bg: 'green_dark' }}
                                            variant="solid" w="100%">Entrar</Button>
                                    </form>

                                    <Text align='center' pt='20px'>Ainda não possuí uma conta? <Link color='green_light'>Cadastre-se</Link></Text>
                                </CardBody>
                            </Card>

                    </HStack>
                </Stack>
            </Center>
        </Box>
    );
}

export default Login;

