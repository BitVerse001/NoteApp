import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import noteRoutes from "./routes/note.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

try {
  mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

app.use(express.json());
app.use("/api/notes", noteRoutes);

app.listen(port, () => {
  console.log(`Server is srunning on port ${port}`);
});
