import { Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Donations from "../pages/Donations";
import Facilities from "../pages/Facilities";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Programmes from "../pages/Programmes";
import Register from "../pages/Register";
import Welcome from "../pages/Welcome";
import Bookings from "../pages/Bookings";
import RoleProtectedRoute from "./RoleProtectedRoute";
import StaffDashboard from "../pages/StaffDashboard";

import PublicLayout from "../layouts/PublicLayout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Welcome />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/donations" element={<Donations />} />
      </Route>

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookings" element={<Bookings />} />
      </Route>

      <Route element={<RoleProtectedRoute allowedRoles={["staff", "admin"]} />}>
        <Route path="/staff" element={<StaffDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
