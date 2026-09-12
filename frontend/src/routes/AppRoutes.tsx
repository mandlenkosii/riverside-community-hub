import { Navigate, Route, Routes } from "react-router-dom"

import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Welcome from "../pages/Welcome"
import ProtectedRoute from "./ProtectedRoute"
import Profile from "../pages/Profile"

/*function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-slate-900">
          Member Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
          Welcome to your Riverside Community Hub account.
        </p>
      </div>
    </main>
  )
} */

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />

      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />
    
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
    </Route>

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  )
}