const router = require("express").Router()
const { PrismaClient } = require("@prisma/client")
const { authenticate, authorize } = require("../middlewares/authMiddleware")

const prisma = new PrismaClient()

router.get("/", authenticate, authorize("ADMIN"), async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    })

    res.json(users)
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router