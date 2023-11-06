import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";

const AvatarMenu: React.FC = () => {
  const navigate = useNavigate();

  const [auth, setAuth] = useAuth();

  const userName = auth?.name;

  const handleLogout = useCallback(() => {
    setAuth(null);
    navigate("/");
  }, [setAuth, navigate]);

  return (
    <Popover placement="right-start">
      <PopoverTrigger>
        <Avatar
          name={userName ?? "Usuário"}
          src="https://bit.ly/broken-link"
          size="sm"
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Configurações</PopoverHeader>
        <PopoverBody>
          <Button color={"icons"} size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default AvatarMenu;
