import { useContext } from "react";
import publicRoutes from "./routes/public.routes";
import privateRoutes from "./routes/private.routes";
import { AuthContext } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const authContext = useContext(AuthContext);
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
