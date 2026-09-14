import { Heart, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function PublicFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600">
                <Heart size={23} strokeWidth={2.5} />
              </div>

              <div>
                <p className="text-lg font-bold">Riverside</p>

                <p className="text-sm text-slate-400">Community Hub</p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Connecting people, creating opportunities, and building a stronger
              community together.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h3>

            <div className="mt-4 space-y-3">
              <Link
                to="/"
                className="block text-sm text-slate-400 transition hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/facilities"
                className="block text-sm text-slate-400 transition hover:text-white"
              >
                Facilities
              </Link>

              <Link
                to="/programmes"
                className="block text-sm text-slate-400 transition hover:text-white"
              >
                Programmes
              </Link>

              <Link
                to="/donations"
                className="block text-sm text-slate-400 transition hover:text-white"
              >
                Donations
              </Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Account
            </h3>

            <div className="mt-4 space-y-3">
              <Link
                to="/login"
                className="block text-sm text-slate-400 transition hover:text-white"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="block text-sm text-slate-400 transition hover:text-white"
              >
                Join Riverside
              </Link>

              <Link
                to="/dashboard"
                className="block text-sm text-slate-400 transition hover:text-white"
              >
                Member Dashboard
              </Link>

              <Link
                to="/profile"
                className="block text-sm text-slate-400 transition hover:text-white"
              >
                My Profile
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Connect
            </h3>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Have a question or want to support the Riverside community?
            </p>

            <div className="mt-5 flex gap-3">
              <a
                href="mailto:info@riversidecommunityhub.org"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition hover:bg-emerald-600 hover:text-white"
                aria-label="Email Riverside"
              >
                <Mail size={18} />
              </a>

              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition hover:bg-emerald-600 hover:text-white"
                aria-label="Contact Riverside on WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Riverside Community Hub. All rights
            reserved.
          </p>

          <p>Built to serve the community.</p>
        </div>
      </div>
    </footer>
  );
}
