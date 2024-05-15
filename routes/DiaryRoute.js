import express from "express";
import { createDiary, fetchDiaries, updateDiary, deleteDiary } from '../controller/DiaryController.js';

const route = express.Router();

route.post("/create", createDiary);
route.get("/getAllDiaries", fetchDiaries);
route.put("/update/:id", updateDiary);
route.delete("/delete/:id", deleteDiary);

export default route;
