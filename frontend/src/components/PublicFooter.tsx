import { Link } from "react-router-dom"
import {
  Mail,
  Heart,
  MessageCircle,
} from "lucide-react"

export default function PublicFooter() {
  return (
    <footer className="mt-20 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Heart size={20} />
            </div>

            <div>
              <p className="font-bold text-white">
                Riverside
              </p>
              <p className="text-xs text-slate-400">
                Community Hub
              </p>
            </div>
          </div>

          <p className="max-w-sm text-sm leading-6 text-slate-400">
            Connecting people, supporting families and
            creating opportunities for our community to
            grow together.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">
            Explore
          </h3>

          <div className="flex flex-col gap-3 text-sm">
            <Link
              to="/facilities"
              className="hover:text-white"
            >
              Facilities
            </Link>

            <Link
              to="/programmes"
              className="hover:text-white"
            >
              Programmes
            </Link>

            <Link
              to="/donations"
              className="hover:text-white"
            >
              Donations
            </Link>

            <Link
              to="/register"
              className="hover:text-white"
            >
              Become a member
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-white">
            Connect
          </h3>

          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Email Riverside Community Hub"
              className="rounded-lg border border-slate-700 p-2 transition hover:border-slate-500 hover:text-white"
            >
              <Mail size={18} />
            </a>

            <a
              href="#"
              aria-label="Contact Riverside Community Hub"
              className="rounded-lg border border-slate-700 p-2 transition hover:border-slate-500 hover:text-white"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Riverside Community
            Hub. All rights reserved.
          </p>

          <p>
            Built to serve the community.
          </p>
        </div>
      </div>
    </footer>
  )
}