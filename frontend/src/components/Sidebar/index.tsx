import {
  Box,
  List,
  ListItem,
  Tag,
  Tooltip,
  Link as ChakraLink,
  TagLabel,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

import {
  BsHouse,
  BsCardText,
  BsBuilding,
  BsPerson,
  BsTag,
  BsFileEarmarkText,
  BsPostcardFill,
} from "react-icons/bs";
import React from "react";

type CustomCardProps = {
  children: React.ReactNode;
};

const CustomCard = React.forwardRef<HTMLSpanElement, CustomCardProps>(
  ({ children, ...rest }, ref) => (
    <Box p="0">
      <Tag
        ref={ref}
        {...rest}
        backgroundColor="transparent"
        size="lg"
        borderRadius="none"
        justifyContent="flex-start"
        alignItems="center"
      >
        <TagLabel>{children}</TagLabel>
      </Tag>
    </Box>
  )
);

function Sidebar() {
  return (
    <List fontSize="xl" spacing={4}>
      <ListItem py={2}></ListItem>
      <ListItem>
        <ChakraLink
          as={ReactRouterLink}
          to="/portal"
          _hover={{ textDecor: "none", color: "green_light" }}
        >
          <Tooltip
            label="Dashboard"
            aria-label="A tooltip"
            hasArrow
            size="md"
            placement="right-end"
          >
            <CustomCard>
              <BsHouse size={24} />
            </CustomCard>
          </Tooltip>
        </ChakraLink>
      </ListItem>
      <ListItem>
        <ChakraLink
          as={ReactRouterLink}
          to="/portal/activities"
          _hover={{ textDecor: "none", color: "green_light" }}
        >
          <Tooltip
            label="Atividades"
            aria-label="A tooltip"
            hasArrow
            size="md"
            placement="right-end"
          >
            <CustomCard>
              <BsCardText size={24} />
            </CustomCard>
          </Tooltip>
        </ChakraLink>
      </ListItem>
      <ListItem>
        <ChakraLink
          as={ReactRouterLink}
          to="/portal/users"
          _hover={{ textDecor: "none", color: "green_light" }}
        >
          <Tooltip
            label="Usuários"
            aria-label="A tooltip"
            hasArrow
            size="md"
            placement="right-end"
          >
            <CustomCard>
              <BsPerson size={24} />
            </CustomCard>
          </Tooltip>
        </ChakraLink>
      </ListItem>
      <ListItem>
        <ChakraLink
          as={ReactRouterLink}
          to="/portal/institutes"
          _hover={{ textDecor: "none", color: "green_light" }}
        >
          <Tooltip
            label="Instituições"
            aria-label="A tooltip"
            hasArrow
            size="md"
            placement="right-end"
          >
            <CustomCard>
              <BsBuilding size={24} />
            </CustomCard>
          </Tooltip>
        </ChakraLink>
      </ListItem>
      <ListItem>
        <ChakraLink
          as={ReactRouterLink}
          to="/portal/status"
          _hover={{ textDecor: "none", color: "green_light" }}
        >
          <Tooltip
            label="Status"
            aria-label="A tooltip"
            hasArrow
            size="md"
            placement="right-end"
          >
            <CustomCard>
              <BsTag size={24} />
            </CustomCard>
          </Tooltip>
        </ChakraLink>
      </ListItem>
      <ListItem>
        <ChakraLink
          as={ReactRouterLink}
          to="/portal/forms"
          _hover={{ textDecor: "none", color: "green_light" }}
        >
          <Tooltip
            label="Formulários"
            aria-label="A tooltip"
            hasArrow
            size="md"
            placement="right-end"
          >
            <CustomCard>
              <BsFileEarmarkText size={24} />
            </CustomCard>
          </Tooltip>
        </ChakraLink>
      </ListItem>
      <ListItem>
        <ChakraLink
          as={ReactRouterLink}
          to="/portal//reportings"
          _hover={{ textDecor: "none", color: "green_light" }}
        >
          <Tooltip
            label="Relatórios"
            aria-label="A tooltip"
            hasArrow
            size="md"
            placement="right-end"
          >
            <CustomCard>
              <BsPostcardFill size={24} />
            </CustomCard>
          </Tooltip>
        </ChakraLink>
      </ListItem>
    </List>
  );
}

export default Sidebar;
