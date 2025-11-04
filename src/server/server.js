import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;  // Use PORT from environment or default to 5000

// Middleware
app.use(cors());
app.use(express.json());

// Verificar variable
//console.log("MONGODB_URI =", process.env.MONGODB_URI);

/// Conexión a MongoDB 
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB a la base de datos BBDD"))
.catch((err) => console.error("Could not connect to MongoDB:", err));


//Iniciar el servidor Express en el puerto especificado
app.listen(PORT, () => {
  console.log(`Server Express está corriendo en el puerto: ${PORT}`);
});