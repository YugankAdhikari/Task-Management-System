"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        { name, email, password }
      )

      router.push("/login")
    } catch (err) {
      setError("Registration failed")
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-black">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(236, 72, 153, 0.3); box-shadow: 0 0 20px rgba(236, 72, 153, 0.1); }
          50% { border-color: rgba(236, 72, 153, 0.6); box-shadow: 0 0 30px rgba(236, 72, 153, 0.2); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-glow { animation: glow 4s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.6s ease-out; }
        .animate-pulse-border { animation: pulse-border 3s ease-in-out infinite; }
      `}</style>

      {/* Pitch Black Background */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Animated Pink Glow Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-glow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-pink-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>

      {/* Content */}
      <form onSubmit={handleRegister} className="relative w-full max-w-md px-4 animate-slide-up">
        {/* Glass Card with Pink Border */}
        <div className="backdrop-blur-2xl bg-white/3 border border-pink-500/30 rounded-2xl p-8 shadow-2xl animate-pulse-border">
          {/* Animated Title */}
          <h1 className="text-4xl font-bold text-white mb-2 text-center bg-gradient-to-r from-white to-pink-300 bg-clip-text text-transparent">Create Account</h1>
          <p className="text-center text-gray-400 text-sm mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>Join us today</p>

          {/* Name Input */}
          <div className="mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <input
              type="text"
              placeholder="Full name"
              className="w-full bg-white/5 border border-pink-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 transition-all duration-500 focus:outline-none focus:bg-white/10 focus:border-pink-500/60 focus:ring-2 focus:ring-pink-500/30 hover:border-pink-500/40"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div className="mb-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-white/5 border border-pink-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 transition-all duration-500 focus:outline-none focus:bg-white/10 focus:border-pink-500/60 focus:ring-2 focus:ring-pink-500/30 hover:border-pink-500/40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-white/5 border border-pink-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 transition-all duration-500 focus:outline-none focus:bg-white/10 focus:border-pink-500/60 focus:ring-2 focus:ring-pink-500/30 hover:border-pink-500/40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-pink-500/10 border border-pink-500/40 rounded-lg animate-slide-up">
              <p className="text-pink-400 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.03] active:scale-95 shadow-lg hover:shadow-pink-500/50 mb-6 animate-slide-up"
            style={{ animationDelay: '0.5s' }}
          >
            Register
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-500 text-sm animate-slide-up" style={{ animationDelay: '0.6s' }}>
            Already have an account?{" "}
            <a
              href="/login"
              className="text-pink-400 hover:text-pink-300 font-semibold transition-all duration-300 hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}
