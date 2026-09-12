import { Outlet } from "react-router-dom"

import PublicNavbar from "../components/PublicNavbar"
import PublicFooter from "../components/PublicFooter"

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PublicNavbar />

      <main>
        <Outlet />
      </main>

      <PublicFooter />
    </div>
  )
}