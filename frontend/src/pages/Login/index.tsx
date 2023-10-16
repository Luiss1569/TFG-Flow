import React, { SyntheticEvent, useState } from 'react';
import './style.css';
import api from "../../lib/axios";
import { FormErrorMessage, FormControl, FormHelperText, Show, HStack, Button, Flex, Text, FormLabel, VStack, Heading, Input, Alert, AlertIcon, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginUserFormSchema = z.object({
    cpf: z.string()
        .nonempty('O cpf é obrigatório')
        .regex(/^[0-9]{11}$/, 'CPF inválido'),
    password: z.string()
        .nonempty('A senha é obrigatória')
})

type CreateUserFormData = z.infer<typeof loginUserFormSchema>

function Login() {
    const { register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateUserFormData>({
        resolver: zodResolver(loginUserFormSchema),
    });

    const [errorText, setErrorText] = useState<string | null>(null);
    const [show, setShow] = useState(false)

    const handleClick = () => setShow(!show)
    const loginUser = async (data: any) => {
        try {
            const cpf = data.cpf;
            const password = data.password;
            console.log(cpf, password);
            await api.post("login", {
                cpf,
                password
            })
        } catch (error: any) {
            setErrorText(error.message);
        }
    };
    return (
        <HStack w="70%" h="100vh" margin="auto">
            {errorText && (
                <Alert status='error' colorScheme='red' pos="fixed" top="0" left="0" >
                    <AlertIcon />
                    {errorText}
                </Alert>
            )}

            <Show breakpoint='(min-width: 500px)' >
                <Flex h="50%" alignItems="center">
                    <Text w="80%" fontSize='5xl'>Faça o login para acessar sua conta</Text>
                </Flex>
            </Show>
            <Flex w="50%" h="50%" alignItems="center" justifyContent="center" bg="#F5F5F5" >
                <VStack>
                    <form onSubmit={handleSubmit(loginUser)}>
                        <FormControl isRequired isInvalid={errors.cpf != null}>
                            <FormLabel htmlFor="cpf">CPF</FormLabel>
                            <Input
                                id="cpf"
                                placeholder="Digite seu CPF"
                                type='text'
                                {...register('cpf')}
                            />
                            {errors.cpf && <FormHelperText >{errors.cpf.message}</FormHelperText>}

                        </FormControl>
                        <FormControl isRequired isInvalid={errors.password != null}>
                            <FormLabel htmlFor="password" >Password</FormLabel>

                            <InputGroup size='md'>
                                <Input
                                    variant='outline'
                                    id="password"
                                    placeholder="Digite sua senha"
                                    type={show ? 'text' : 'password'}
                                    {...register('password')}
                                />

                                <InputRightElement width='4.5rem'>
                                    {show && (
                                        <ViewIcon onClick={handleClick} />
                                    )}
                                    {!show && (
                                        <ViewOffIcon onClick={handleClick}></ViewOffIcon>
                                    )}
                                </InputRightElement>

                            </InputGroup>
                            {errors.password && <FormHelperText >{errors.password.message}</FormHelperText>}

                        </FormControl>
                        <Button isLoading={isSubmitting}
                            mt='1rem'
                            type='submit'
                            variant="solid" w="100%">Entrar</Button>
                    </form>
                </VStack>
            </Flex>

        </HStack>

    );
}

export default Login;

