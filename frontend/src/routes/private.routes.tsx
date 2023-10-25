import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Response from "../pages/Response";
import Dashboard from "../pages/Dashboard";
import ListUsers from "../components/ListUsers";

export function PrivateRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} >
          <Route path="listusers" element={<ListUsers />} />
        </Route>
        <Route path="/response/:slug" element={<Response />} />
      </Routes>
    </Router>
  );
}
