import cors from "cors"
import dotenv from "dotenv"
import express from "express"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
)

app.use(express.json())

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Riverside Community Hub API is running",
    timestamp: new Date().toISOString(),
  })
})

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  })
})

app.listen(PORT, () => {
  console.log(`Riverside API running on http://localhost:${PORT}`)
})