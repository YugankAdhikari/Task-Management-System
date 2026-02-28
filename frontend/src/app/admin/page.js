"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const [users, setUsers] = useState([])
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/login")
      return
    }

    checkAccess(token)
  }, [])

  const checkAccess = async (token) => {
    try {
      const me = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (me.data.role !== "ADMIN") {
        router.push("/dashboard")
        return
      }

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setUsers(res.data)
    } catch {
      router.push("/login")
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-pink-300 bg-clip-text text-transparent">
          Admin Panel
        </h1>

        <p className="text-xs sm:text-sm text-pink-400">
          Manage system users
        </p>
      </div>

      {/* Glass Container */}
      <div className="backdrop-blur-xl bg-white/5 border border-pink-500/20 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(236,72,153,0.15)]">

        {users.length === 0 ? (
          <p className="text-gray-400 text-sm">No users found.</p>
        ) : (
          <div className="space-y-5">

            {users.map((user) => (
              <div
                key={user.id}
                className="backdrop-blur-lg bg-white/5 border border-pink-500/20 rounded-xl p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 transition-all duration-300 hover:shadow-[0_0_25px_rgba(236,72,153,0.25)]"
              >
                {/* Left Info */}
                <div className="space-y-1">
                  <p className="text-white font-semibold">
                    {user.name}
                  </p>
                  <p className="text-gray-400 text-sm break-all">
                    {user.email}
                  </p>
                </div>

                {/* Role Badge */}
                <div>
                  <span
                    className={`px-4 py-1 text-xs font-medium rounded-full border ${
                      user.role === "ADMIN"
                        ? "bg-pink-600/20 text-pink-400 border-pink-500/40"
                        : "bg-blue-600/20 text-blue-400 border-blue-500/40"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  )
}