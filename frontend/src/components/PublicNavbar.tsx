import { useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function navLinkClasses({ isActive }: { isActive: boolean }) {
  return `text-sm font-semibold transition ${
    isActive ? "text-emerald-600" : "text-slate-600 hover:text-emerald-600"
  }`;
}

export default function PublicNavbar() {
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  async function handleSignOut() {
    closeMobileMenu();
    await signOut();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
            <Heart size={25} strokeWidth={2.5} fill="none" />
          </div>

          <div className="leading-tight">
            <span className="block text-lg font-bold text-slate-900">
              Riverside
            </span>

            <span className="block text-sm text-slate-500">Community Hub</span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>

          <NavLink to="/facilities" className={navLinkClasses}>
            Facilities
          </NavLink>

          <NavLink to="/programmes" className={navLinkClasses}>
            Programmes
          </NavLink>

          <NavLink to="/donations" className={navLinkClasses}>
            Donations
          </NavLink>

          {user ? (
            <>
              <NavLink to="/dashboard" className={navLinkClasses}>
                Dashboard
              </NavLink>

              <NavLink to="/bookings" className={navLinkClasses}>
                Bookings
              </NavLink>

              <NavLink to="/profile" className={navLinkClasses}>
                Profile
              </NavLink>

              <button
                type="button"
                onClick={handleSignOut}
                className="text-sm font-semibold text-slate-600 transition hover:text-red-600"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-600 transition hover:text-emerald-600"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Join Riverside
              </Link>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((current) => !current)}
          className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            <NavLink
              to="/"
              onClick={closeMobileMenu}
              className={navLinkClasses}
            >
              Home
            </NavLink>

            <NavLink
              to="/facilities"
              onClick={closeMobileMenu}
              className="border-b border-slate-100 py-4 text-sm font-semibold text-slate-600 transition hover:text-emerald-600"
            >
              Facilities
            </NavLink>

            <NavLink
              to="/programmes"
              onClick={closeMobileMenu}
              className="border-b border-slate-100 py-4 text-sm font-semibold text-slate-600 transition hover:text-emerald-600"
            >
              Programmes
            </NavLink>

            <NavLink
              to="/donations"
              onClick={closeMobileMenu}
              className="border-b border-slate-100 py-4 text-sm font-semibold text-slate-600 transition hover:text-emerald-600"
            >
              Donations
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className="border-b border-slate-100 py-4 text-sm font-semibold text-slate-600 transition hover:text-emerald-600"
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/bookings"
                  onClick={closeMobileMenu}
                  className="border-b border-slate-100 py-4 text-sm font-semibold text-slate-600 transition hover:text-emerald-600"
                >
                  Bookings
                </NavLink>

                <NavLink
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="border-b border-slate-100 py-4 text-sm font-semibold text-slate-600 transition hover:text-emerald-600"
                >
                  Profile
                </NavLink>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="py-4 text-left text-sm font-semibold text-red-600"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="border-b border-slate-100 py-4 text-sm font-semibold text-slate-600"
                >
                  Sign in
                </Link>

                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="mt-4 rounded-xl bg-emerald-600 px-5 py-3 text-center text-sm font-semibold text-white"
                >
                  Join Riverside
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
