const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body

    if (!title) {
      return res.status(400).json({ message: "Title is required" })
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.user.userId
      }
    })

    res.status(201).json(task)

  } catch (error) {
    console.log("CREATE TASK ERROR:", error)
    res.status(500).json({ message: "Server error" })
  }
}

exports.getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user.userId
      }
    })

    res.json(tasks)

  } catch (error) {
    console.log("GET TASK ERROR:", error)
    res.status(500).json({ message: "Server error" })
  }
}

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, completed } = req.body

    const task = await prisma.task.findUnique({
      where: { id }
    })

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    if (req.user.role !== "ADMIN" && task.userId !== req.user.userId) {
      return res.status(403).json({ message: "Forbidden" })
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, description, completed }
    })

    res.json(updatedTask)

  } catch (error) {
    console.log("UPDATE TASK ERROR:", error)
    res.status(500).json({ message: "Server error" })
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params

    const task = await prisma.task.findUnique({
      where: { id }
    })

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    if (req.user.role !== "ADMIN" && task.userId !== req.user.userId) {
      return res.status(403).json({ message: "Forbidden" })
    }

    await prisma.task.delete({
      where: { id }
    })

    res.json({ message: "Task deleted successfully" })

  } catch (error) {
    console.log("DELETE TASK ERROR:", error)
    res.status(500).json({ message: "Server error" })
  }
}