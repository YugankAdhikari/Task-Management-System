const express = require("express")
const cors = require("cors")

const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("../swagger")

const authRoutes = require("./routes/authRoutes")
const taskRoutes = require("./routes/taskRoutes")
const userRoutes = require("./routes/userRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get("/", (req, res) => {
  res.json({ message: "API is running" })
})

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/tasks", taskRoutes)
app.use("/api/v1/users", userRoutes)

module.exports = app