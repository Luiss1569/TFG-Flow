import React, { useContext } from 'react';
import { PublicRoutes } from './routes/public.routes';
import { PrivateRoutes } from './routes/private.routes';
import AuthProvider, { AuthContext } from './contexts/AuthContext';

function App() {
  const authContext = useContext(AuthContext);
  console.log( authContext?.token);
  return authContext?.token ? <PrivateRoutes /> : <PublicRoutes />;
}

export default App;

