import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Response from "./pages/Response";
import Dashboard from "./pages/Dashboard";
import ListUsers from "./components/ListUsers";
import ActivityDetails from "./pages/ActivityDetails";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="listusers" element={<ListUsers />} />
        <Route path="/response/:slug" element={<Response />} />
        <Route path="/activity/:id/details" element={<ActivityDetails />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}
