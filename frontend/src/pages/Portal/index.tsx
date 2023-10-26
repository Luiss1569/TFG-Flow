import { Flex, IconButton, useColorMode } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

function Dashboard() {
  const { colorMode, toggleColorMode } = useColorMode();

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
        <IconButton
          mb={4}
          aria-label="toggle theme"
          rounded="full"
          size="xs"
          onClick={toggleColorMode}
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        />
      </Flex>

      <Flex bg="gray.100" minH={"100vh"} w={"100%"} ml={12} p={5}>
        <Outlet />
      </Flex>
    </Flex>
  );
}

export default Dashboard;
