"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/login")
      return
    }

    fetchUser(token)
    fetchTasks(token)
}, [])

const fetchUser = async (token) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    setUser(res.data)
  } catch {
    router.push("/login")
  }
}

  const fetchTasks = async (token) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setTasks(res.data)
    } catch {
      setError("Failed to load tasks")
    }
  }

  const createTask = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks`,
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      setTitle("")
      setDescription("")
      fetchTasks(token)
    } catch {
      setError("Failed to create task")
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
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

      {/* Animated Pink Glow Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-glow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-pink-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>

      {/* Content */}
      <div className="relative z-10 p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-8 animate-slide-up">

  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-pink-300 bg-clip-text text-transparent">
    Dashboard
  </h1>

  {user && (
    <p className="text-xs sm:text-sm text-pink-400">
      Welcome, <span className="font-medium">{user.email}</span>
    </p>
  )}

</div>

        {/* Create Task Form */}
        <form onSubmit={createTask} className="backdrop-blur-2xl bg-white/3 border border-pink-500/30 rounded-2xl p-6 mb-8 animate-slide-up animate-pulse-border" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-xl font-bold text-white mb-4">Create New Task</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Task title"
              className="bg-white/5 border border-pink-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 transition-all duration-500 focus:outline-none focus:bg-white/10 focus:border-pink-500/60 focus:ring-2 focus:ring-pink-500/30 hover:border-pink-500/40"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Task description"
              className="bg-white/5 border border-pink-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 transition-all duration-500 focus:outline-none focus:bg-white/10 focus:border-pink-500/60 focus:ring-2 focus:ring-pink-500/30 hover:border-pink-500/40"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-pink-500/50">
            Add Task
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-pink-500/10 border border-pink-500/40 rounded-lg animate-slide-up">
            <p className="text-pink-400 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {tasks.length === 0 ? (
            <div className="backdrop-blur-2xl bg-white/3 border border-pink-500/30 rounded-2xl p-8 text-center">
              <p className="text-gray-400">No tasks yet. Create one to get started!</p>
            </div>
          ) : (
            tasks.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                index={index}
                refreshTasks={() =>
                  fetchTasks(localStorage.getItem("token"))
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function TaskItem({ task, index, refreshTasks }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description || "")

  const token = localStorage.getItem("token")

  const saveEdit = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks/${task.id}`,
        {
          title: editTitle,
          description: editDescription
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setIsEditing(false)
      refreshTasks()
    } catch {
      alert("Failed to update task")
    }
  }

  const toggleComplete = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks/${task.id}`,
        { completed: !task.completed },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      refreshTasks()
    } catch {
      alert("Failed to update task")
    }
  }

  const deleteTask = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tasks/${task.id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      refreshTasks()
    } catch {
      alert("Failed to delete task")
    }
  }

  return (
    <div
      className="backdrop-blur-2xl bg-white/3 border border-pink-500/20 rounded-2xl p-6 transition-all duration-300 hover:border-pink-500/40 hover:bg-white/5 animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {isEditing ? (
        <div className="space-y-4">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full bg-white/5 border border-pink-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 transition-all duration-300 focus:outline-none focus:bg-white/10 focus:border-pink-500/60 focus:ring-2 focus:ring-pink-500/30"
          />
          <input
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full bg-white/5 border border-pink-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 transition-all duration-300 focus:outline-none focus:bg-white/10 focus:border-pink-500/60 focus:ring-2 focus:ring-pink-500/30"
          />
          <div className="flex gap-3">
            <button
              onClick={saveEdit}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-2 rounded-lg transition-all duration-300"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-white/5 border border-white/20 hover:bg-white/10 text-white font-semibold py-2 rounded-lg transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h2
              className={`font-bold text-lg transition-all duration-300 ${
                task.completed
                  ? "line-through text-gray-500"
                  : "text-white"
              }`}
            >
              {task.title}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {task.description}
            </p>
          </div>

          <div className="flex gap-2 flex-wrap justify-end">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-white/5 border border-pink-500/30 hover:bg-pink-500/20 text-pink-400 font-semibold px-4 py-2 rounded-lg transition-all duration-300"
            >
              Edit
            </button>

            <button
              onClick={toggleComplete}
              className={`font-semibold px-4 py-2 rounded-lg transition-all duration-300 ${
                task.completed
                  ? "bg-white/5 border border-blue-500/30 hover:bg-blue-500/20 text-blue-400"
                  : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
              }`}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>

            <button
              onClick={deleteTask}
              className="bg-white/5 border border-red-500/30 hover:bg-red-500/20 text-red-400 font-semibold px-4 py-2 rounded-lg transition-all duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
