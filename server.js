import express from "express";
import cors from "cors";
import https from "https"; // Import HTTPS module
import fs from "fs"; // Import File System module
import authRoutes from "./routes/authRoutes.js";
import toDoRoutes from "./routes/ToDoRoutes.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import env from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
env.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api", authRoutes);
app.use("/api/todo", toDoRoutes);

// Define paths to your SSL certificate and key
const keyPath = './SSLcertificate/key.pem'; // Path to your key file
const certPath = './SSLcertificate/cert.pem'; // Path to your cert file

// Check if the SSL certificate and key files exist
try {
    fs.accessSync(keyPath, fs.constants.F_OK);
    fs.accessSync(certPath, fs.constants.F_OK);
    console.log("SSL certificate and key files are valid.");
} catch (err) {
    console.error("SSL certificate or key file is missing or invalid. Please check the paths.");
    process.exit(1); // Exit the application if files are not found
}

// Load your SSL certificate and key
const sslOptions = {
    key: fs.readFileSync(keyPath), // Load the private key
    cert: fs.readFileSync(certPath), // Load the SSL certificate
};

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Create HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`HTTPS Server started at port ${PORT}`);
});