import {
  Box,
  List,
  ListItem,
  Tag,
  Tooltip,
  Link as ChakraLink,
  TagLabel,
  TagProps,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";

import {
  BsHouse,
  BsBuilding,
  BsPerson,
  BsTag,
  BsFileEarmarkText,
  BsPostcardFill,
} from "react-icons/bs";
import React, { useMemo } from "react";
import useAuth from "../../hooks/useAuth";

const links = [{ to: "/portal", label: "Dashboard", icon: BsHouse }];

const coordinatorLinks = [
  { to: "/portal/users", label: "Usuários", icon: BsPerson },
  { to: "/portal/institutes", label: "Instituições", icon: BsBuilding },
  { to: "/portal/status", label: "Status", icon: BsTag },
  { to: "/portal/forms", label: "Formulários", icon: BsFileEarmarkText },
  { to: "/portal/reportings", label: "Relatórios", icon: BsPostcardFill },
];

const CustomCard = React.forwardRef<HTMLSpanElement, TagProps>(
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
  const location = useLocation();
  const [token] = useAuth();

  const items = useMemo(() => {
    if (token?.role === "student") {
      return links;
    }
    return links.concat(coordinatorLinks);
  }, [token?.role]);

  return (
    <List fontSize="xl" spacing={4}>
      <ListItem py={1}></ListItem>
      {items.map((data) => (
        <NavLink
          key={data.to}
          {...data}
          active={location.pathname === data.to}
        />
      ))}
    </List>
  );
}

const NavLink = React.memo(
  ({
    to,
    label,
    icon: Icon,
    active = false,
  }: {
    to: string;
    label: string;
    icon: React.ElementType;
    active?: boolean;
  }) => (
    <ListItem key={to}>
      <ChakraLink as={ReactRouterLink} to={to}>
        <Tooltip
          label={label}
          aria-label="A tooltip"
          hasArrow
          size="md"
          placement="right-end"
          bg="white"
          color={"icons"}
          id={to.replace("/portal/", "")}
        >
          <CustomCard
            _hover={{ textDecor: "none", color: "green_light" }}
            _focus={{ outline: "none" }}
            color={active ? "green_light" : "icons.500"}
          >
            <Icon size={24} />
          </CustomCard>
        </Tooltip>
      </ChakraLink>
    </ListItem>
  )
);

export default Sidebar;
