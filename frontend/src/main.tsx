import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider} from "@chakra-ui/react";
import Theme from './styles/theme.ts';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={Theme}>
      <App/> 
    </ChakraProvider>
  </React.StrictMode>,
)
