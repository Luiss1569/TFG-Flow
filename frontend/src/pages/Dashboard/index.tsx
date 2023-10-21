import { Grid, GridItem, IconButton, useColorMode } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

function Dashboard() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (

    <Grid
      templateColumns='repeat(6,1fr)'
      bg='primary'
      
    >

      <GridItem
        borderRight='1px' 
        borderColor='secondary'
        as='aside'
        colSpan={{ base: 6, lg: 2, xl: 1 }}
        p={{ base: '20px', lg: '30px' }}
        minHeight={{ lg: '100vh' }}
      >
        <Sidebar />
      </GridItem>
      <GridItem
        as='main'
        colSpan={{ base: 6, lg: 4, xl: 5 }}
      >
        <Outlet />
      </GridItem>
      <IconButton
        aria-label="toggle theme"
        rounded="full"
        size="xs"
        position="absolute"
        bottom={4}
        left={4}
        onClick={toggleColorMode} icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      />
    </Grid>

  )
}

export default Dashboard;
