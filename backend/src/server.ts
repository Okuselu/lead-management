//server.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import leadRoutes from "./routes/Lead.routes";


import connectDB from "./database";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/api", leadRoutes);


// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// app.use(errorHandler);
const PORT = process.env.PORT || 5055; 

const server = app.listen(PORT, () => {
  console.log(
    colors.yellow.bold(
      `Lead-management server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );
});

process.on("unhandledRejection", (err: any) => {
  console.error(colors.red.bold(`Error: ${err.message}`));
  server.close(() => process.exit(1));
});


// Add this before your routes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});