import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { Link as ChakraLink } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { ArrowBackIcon } from '@chakra-ui/icons';


function Sidebar() {
    return (
        <List fontSize='1.2em' spacing={4}>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/' _hover={{ textDecor: 'none', color: 'green_light' }}>
                    Home
                </ChakraLink>
            </ListItem>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/login' _hover={{ textDecor: 'none', color: 'green_light' }}>
                    Atividades
                </ChakraLink>
            </ListItem>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/listusers' _hover={{ textDecor: 'none', color: 'green_light' }}>
                    Usuários
                </ChakraLink>
            </ListItem>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/institutes' _hover={{ textDecor: 'none', color: 'green_light' }}>
                    Institutos
                </ChakraLink>
            </ListItem>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/status' _hover={{ textDecor: 'none', color: 'green_light' }}>
                    Status
                </ChakraLink>
            </ListItem>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/forms' _hover={{ textDecor: 'none', color: 'green_light' }}>
                    Formulários
                </ChakraLink>
            </ListItem>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/reporting' _hover={{ textDecor: 'none', color: 'green_light'}}>
                    Relatórios
                </ChakraLink>
            </ListItem>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/activityreports' _hover={{ textDecor: 'none', color: 'green_light' }}   >
                    Relatório de Atividades
                </ChakraLink>
            </ListItem>
        </List>
    )
}

export default Sidebar;
