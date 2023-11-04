import { useContext } from "react";
import publicRoutes from "./routes/public.routes";
import privateRoutes from "./routes/private.routes";
import { AuthContext } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import api from "./lib/axios";

function App() {
  const authContext = useContext(AuthContext);

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        authContext?.setToken("");
      }
      return Promise.reject(error);
    }
  );

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        {authContext?.token &&
          privateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element}>
              {route.children?.map((child) => (
                <Route
                  key={child.path}
                  path={child.path}
                  element={child.element}
                  index={child.index}
                />
              ))}
            </Route>
          ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
