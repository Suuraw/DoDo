import express from "express";
const app = express();
import cors from "cors";
// const mongoose = require('mongoose');
import authRoutes from "./routes/authRoutes.js";
import toDoRoutes from './routes/ToDoRoutes.js';
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import env from "dotenv";
env.config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api", authRoutes);
app.use('/api/todo',toDoRoutes);
// mongoose.connect(process.env.DB_URL).then((result)=>{
//     console.log("DB Connected Successfully!");
// }).catch(err=>{
//     console.log(err);
// })
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
