import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(colors.green.bold(`MongoDB connected: ${conn.connection.host}`));
  } catch (error: any) {
    console.error(colors.red.bold(`MongoDB connection error: ${error.message}`));
    process.exit(1);
  }
};

export default connectDB;

// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const MONGO_URI = process.env.MONGO_URI || "";

// export const connectDB = async () => {
//   try {
//     await mongoose.connect(MONGO_URI, {
//       // useNewUrlParser and useUnifiedTopology are now defaults, no need to include them.
//     });
//     console.log("✅ MongoDB Connected Successfully");
//   } catch (error) {
//     console.error("❌ MongoDB Connection Error:", error);
//     process.exit(1); // Exit process with failure
//   }
// };
