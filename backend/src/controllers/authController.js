const bcrypt = require("bcrypt")
const { PrismaClient } = require("@prisma/client")
const { generateToken } = require("../utils/jwt")

const prisma = new PrismaClient()

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    res.status(201).json({ message: "User registered successfully" })

  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = generateToken(user)

    res.json({ token })

  } catch (error) {
    console.log("LOGIN ERROR:", error)
    res.status(500).json({ message: "Server error" })
  }
}
exports.getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    })

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}