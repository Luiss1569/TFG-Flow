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

      <Flex flexDir={"column"} h="100%" w="100%" bg="gray.100">
        <Outlet />d
      </Flex>
    </Flex>
  );
}

export default Dashboard;
