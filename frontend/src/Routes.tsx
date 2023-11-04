import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Users } from "./pages/Users";
import { UserCommon } from "./pages/UserCommon";
import { Institutes } from "./pages/Institutes";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/institutes" element={<Institutes />} />
        <Route path="/userCommon" element={<UserCommon />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}
