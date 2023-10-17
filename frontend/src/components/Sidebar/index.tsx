import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { Link as ChakraLink } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { ArrowBackIcon } from '@chakra-ui/icons';


function Sidebar() {
    return (
        <List>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/'>
                    Home
                </ChakraLink>
                <ListIcon as={ArrowBackIcon} />
            </ListItem>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/login'>
                    Atividades
                </ChakraLink>
            </ListItem>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/listusers'>
                    Usuários
                </ChakraLink>
            </ListItem>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/institutes'>
                    Institutos
                </ChakraLink>
            </ListItem>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/status'>
                    Status
                </ChakraLink>
            </ListItem>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/forms'>
                    Formulários
                </ChakraLink>
            </ListItem>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/reporting'>
                    Relatórios
                </ChakraLink>
            </ListItem>
            <ListItem>
                <ChakraLink as={ReactRouterLink} to='/activityreports'>
                    Relatório de Atividades
                </ChakraLink>
            </ListItem>
        </List>
    )
}

export default Sidebar;
