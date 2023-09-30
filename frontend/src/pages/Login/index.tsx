import React, { SyntheticEvent, useState } from 'react';
import './style.css';
import api from "../../lib/axios";
import { FormControl, FormHelperText, Show, HStack, Button, Flex, Text, FormLabel, VStack, Heading, Input, Alert, AlertIcon, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

function Login() {
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState<string | null>(null);
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    

    const handleClick = () => setShow(!show)
    const handleLogin = async (e: SyntheticEvent) => {

        try {
            setIsLoading(true); 
            e.preventDefault();
            console.log(cpf, password);
            await api.post("login", {
                cpf,
                password
            })
        } catch (error: any) {
            setErrorText(error.message);
        }
        finally{
            setIsLoading(false); 
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
            <Flex w="50%" h="50%" alignItems="center" justifyContent="center" bg= "#F5F5F5" >
                <VStack>
                    
                    <FormControl isRequired>
                        <FormLabel htmlFor="cpf">CPF</FormLabel>
                        <Input
                            id="cpf"
                            placeholder="Digite sua senha"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            type='text'
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel  htmlFor="password" >Password</FormLabel>
                        <InputGroup size='md'>
                            <Input
                                variant='outline'
                                id="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={show ? 'text' : 'password'}
                            />

                            <InputRightElement width='4.5rem'>
                                    {show && (
                                        <ViewIcon onClick={handleClick}/> 
                                    )}
                                    {!show && (
                                    <ViewOffIcon  onClick={handleClick}></ViewOffIcon>
                                    )}
                            </InputRightElement>
                        </InputGroup>
                        <FormHelperText>Nunca compartilhe sua senha.</FormHelperText>

                    </FormControl>
                    <Button isLoading={isLoading}  onClick={handleLogin} variant="solid" w="100%">Entrar</Button>
                    
                </VStack>
            </Flex>
            
        </HStack>
        
    );
}

export default Login;

