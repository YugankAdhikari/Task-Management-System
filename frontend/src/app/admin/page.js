"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const [users, setUsers] = useState([])
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")

    console.log("TOKEN:", token)

    if (!token) {
      console.log("No token found, redirecting to login")
      router.push("/login")
      return
    }

    checkAccess(token)
  }, [])

  const checkAccess = async (token) => {
    try {
      console.log("Calling /auth/me...")

      const me = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      console.log("ME RESPONSE:", me.data)

      if (me.data.role !== "ADMIN") {
        console.log("User is not ADMIN, redirecting to dashboard")
        router.push("/dashboard")
        return
      }

      console.log("Calling /users...")

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      console.log("USERS RESPONSE:", res.data)

      setUsers(res.data)

    } catch (err) {
      console.log("ADMIN ERROR:")
      console.log("Status:", err.response?.status)
      console.log("Data:", err.response?.data)
      console.log("Full error:", err)

      // 🚫 TEMPORARILY DO NOT REDIRECT
      // router.push("/login")
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-pink-300 bg-clip-text text-transparent">
          Admin Panel
        </h1>

        <p className="text-xs sm:text-sm text-pink-400">
          Manage system users
        </p>
      </div>

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
                <div className="space-y-1">
                  <p className="text-white font-semibold">
                    {user.name}
                  </p>
                  <p className="text-gray-400 text-sm break-all">
                    {user.email}
                  </p>
                </div>

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