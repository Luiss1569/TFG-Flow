import { Grid, GridItem, List, ListIcon, ListItem } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";


function Dashboard(){
    return(
      <Grid
      templateAreas={`"header header"
                      "nav main"
                      "nav footer"`}
      gridTemplateRows={'50px 1fr 30px'}
      gridTemplateColumns={'200px 1fr'}
      // h='200px'
      gap='1'
      // color='blackAlpha.700'
      fontWeight='bold'
    >
      <GridItem pl='2'area={'header'}>
        Header
      </GridItem>
      <GridItem pl='2' area={'nav'}>
        <Sidebar/>
      </GridItem>
      <GridItem pl='2' area={'main'}>
        <Outlet/>
      </GridItem>
      <GridItem pl='2' area={'footer'}>
        Footer
      </GridItem>
    </Grid>
    
    )
}

export default Dashboard;
