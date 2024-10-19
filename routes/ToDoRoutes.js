import express from "express";
import {createToDo, getAllToDo,deleteToDo,updateToDo} from "../controllers/toDoController.js";
import authenticateToken from "../middleware/authJwt.js"
const router = express.Router();


router.post('/create-to-do',authenticateToken,createToDo)
router.get('/get-all-to-do/:userId',authenticateToken,getAllToDo);
router.delete('/delete-to-do/:id',authenticateToken,deleteToDo);
router.patch('/update-to-do/:id',authenticateToken,updateToDo);
// router.post('/create-to-do',createToDo)
// router.get('/get-all-to-do/:userId',getAllToDo);
// router.delete('/delete-to-do/:id',deleteToDo);
// router.patch('/update-to-do/:id',updateToDo);


export default router;
