import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { profileService, type UserRole } from "../services/profileService";

interface RoleProtectedRouteProps {
  allowedRoles: UserRole[];
}

export default function RoleProtectedRoute({
  allowedRoles,
}: RoleProtectedRouteProps) {
  const { user, loading: authLoading } = useAuth();

  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRole() {
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const profile = await profileService.getCurrentProfile();
        setRole(profile?.role ?? null);
      } catch (error) {
        console.error("Unable to load user role:", error);
        setRole(null);
      } finally {
        setLoading(false);
      }
    }

    if (!authLoading) {
      loadRole();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />
          <p className="mt-4 text-sm text-slate-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
