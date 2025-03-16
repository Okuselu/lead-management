import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import leadRoutes from "./routes/Lead.routes";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./database";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://frontend-1e4tvdqq8-gmailcoms-projects.vercel.app' // Add your frontend URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Health check endpoint
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

// Request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Routes
app.use("/api", leadRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5050;

const server = app.listen(PORT, () => {
  console.log(
    colors.yellow.bold(
      `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
    )
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error(colors.red.bold(`Error: ${err.message}`));
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  console.error(colors.red.bold(`Error: ${err.message}`));
  server.close(() => process.exit(1));
});