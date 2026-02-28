"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter, usePathname } from "next/navigation"

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setUser(res.data)
    }).catch(() => {
      localStorage.removeItem("token")
      setUser(null)
      router.push("/login")
    })
  }, [pathname])

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setMenuOpen(false)
    router.push("/login")
  }

  const navigate = (path) => {
    setMenuOpen(false)
    router.push(path)
  }

  return (
    <div className="sticky top-4 z-50 px-3">
      <nav className="backdrop-blur-xl bg-white/5 border border-pink-500/20 rounded-2xl shadow-[0_0_40px_rgba(236,72,153,0.15)]">

        {/* Top Row */}
        <div className="flex items-center justify-between px-4 py-3">

          {/* Branding */}
          <div className="text-xs sm:text-sm text-gray-300 leading-tight">
            Made by <span className="text-pink-400 font-semibold">Yugank</span>
          </div>

          {/* Hamburger */}
          {user && (
            <button
              className="md:hidden text-white text-xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          )}

          {/* Desktop Menu */}
          {user && (
            <div className="hidden md:flex items-center gap-8">

              <button
                onClick={() => navigate("/dashboard")}
                className={`${
                  pathname === "/dashboard"
                    ? "text-pink-400"
                    : "text-gray-300 hover:text-pink-400"
                }`}
              >
                Dashboard
              </button>

              {user.role === "ADMIN" && (
                <button
                  onClick={() => navigate("/admin")}
                  className={`${
                    pathname === "/admin"
                      ? "text-pink-400"
                      : "text-gray-300 hover:text-pink-400"
                  }`}
                >
                  Admin
                </button>
              )}

              <span className="text-sm text-gray-400">
                {user.name} <span className="text-pink-400">({user.role})</span>
              </span>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-pink-500 text-white"
              >
                Logout
              </button>

            </div>
          )}
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && user && (
          <div className="md:hidden border-t border-pink-500/20 px-4 pb-4 space-y-3">

            <button
              onClick={() => navigate("/dashboard")}
              className="block w-full text-left text-gray-300 hover:text-pink-400"
            >
              Dashboard
            </button>

            {user.role === "ADMIN" && (
              <button
                onClick={() => navigate("/admin")}
                className="block w-full text-left text-gray-300 hover:text-pink-400"
              >
                Admin
              </button>
            )}

            <div className="pt-3 border-t border-pink-500/20">
              <div className="text-sm text-gray-400 mb-2">
                {user.name} ({user.role})
              </div>

              <button
                onClick={logout}
                className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-pink-500 text-white"
              >
                Logout
              </button>
            </div>

          </div>
        )}
      </nav>
    </div>
  )
}