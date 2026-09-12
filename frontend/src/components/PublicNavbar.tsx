import { Link, useNavigate } from "react-router-dom"
import {
  CalendarDays,
  Heart,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"

import { useAuth } from "../context/AuthContext"

export default function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    setMobileOpen(false)
    navigate("/")
  }

  const closeMenu = () => {
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <Heart size={21} />
          </div>

          <div>
            <p className="text-lg font-bold text-slate-900">
              Riverside
            </p>
            <p className="text-xs text-slate-500">
              Community Hub
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <Link
            to="/facilities"
            className="text-sm font-medium text-slate-600 transition hover:text-emerald-600"
          >
            Facilities
          </Link>

          <Link
            to="/programmes"
            className="text-sm font-medium text-slate-600 transition hover:text-emerald-600"
          >
            Programmes
          </Link>

          <Link
            to="/donations"
            className="text-sm font-medium text-slate-600 transition hover:text-emerald-600"
          >
            Donations
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <CalendarDays size={16} />
                Dashboard
              </Link>

              <button
                onClick={handleSignOut}
                className="text-sm font-medium text-slate-600 transition hover:text-red-600"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-600 transition hover:text-emerald-600"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Join Riverside
              </Link>
            </>
          )}
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link
              to="/facilities"
              onClick={closeMenu}
              className="font-medium text-slate-700"
            >
              Facilities
            </Link>

            <Link
              to="/programmes"
              onClick={closeMenu}
              className="font-medium text-slate-700"
            >
              Programmes
            </Link>

            <Link
              to="/donations"
              onClick={closeMenu}
              className="font-medium text-slate-700"
            >
              Donations
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="font-medium text-emerald-600"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleSignOut}
                  className="text-left font-medium text-red-600"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="font-medium text-slate-700"
                >
                  Sign in
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="font-semibold text-emerald-600"
                >
                  Join Riverside
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}