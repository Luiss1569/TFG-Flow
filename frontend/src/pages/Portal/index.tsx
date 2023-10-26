import {
  Avatar,
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useColorMode,
} from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useAuth } from "../../contexts/AuthContext";
import { useCallback } from "react";

function Dashboard() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const [auth, setAuth] = useAuth();

  const userName = auth?.name;

  const handleLogout = useCallback(() => {
    setAuth(null);
    navigate("/");
  }, [setAuth, navigate]);

  return (
    <Flex flexDir={"row"} position="relative">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexDir="column"
        h="100vh"
        bg="white"
        position="fixed"
      >
        <Sidebar />
        <Flex direction={"column"} mb="4">
          <IconButton
            mb={4}
            aria-label="toggle theme"
            rounded="full"
            size="xs"
            onClick={toggleColorMode}
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          />

          <Popover placement="right">
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
                <Button colorScheme="red" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>

      <Flex bg="gray.100" minH={"100vh"} w={"100%"} ml={12} p={5}>
        <Outlet />
      </Flex>
    </Flex>
  );
}

export default Dashboard;
