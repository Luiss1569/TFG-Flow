import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Response from "../pages/Response";
import Dashboard from "../pages/Dashboard";
import ListUsers from "../components/ListUsers";

export function PublicRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} >
          <Route path="listusers" element={<ListUsers />} />
        </Route>
        <Route path="/response/:slug" element={<Response />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}
