import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { Link as ChakraLink } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { ArrowBackIcon } from '@chakra-ui/icons';


function Sidebar() {
    return (
        <List >
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/' _hover={{ textDecor: 'none' }}>
                    Home
                    <ListIcon as={ArrowBackIcon} />
                </ChakraLink>
            </ListItem>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/login' _hover={{ textDecor: 'none' }}>
                    Atividades
                </ChakraLink>
            </ListItem>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/listusers' _hover={{ textDecor: 'none' }}>
                    Usuários
                </ChakraLink>
            </ListItem>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/institutes' _hover={{ textDecor: 'none' }}>
                    Institutos
                </ChakraLink>
            </ListItem>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/status' _hover={{ textDecor: 'none' }}>
                    Status
                </ChakraLink>
            </ListItem>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/forms' _hover={{ textDecor: 'none' }}>
                    Formulários
                </ChakraLink>
            </ListItem>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/reporting' _hover={{ textDecor: 'none'}}>
                    Relatórios
                </ChakraLink>
            </ListItem>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/activityreports' _hover={{ textDecor: 'none' }}   >
                    Relatório de Atividades
                </ChakraLink>
            </ListItem>
        </List>
    )
}

export default Sidebar;
