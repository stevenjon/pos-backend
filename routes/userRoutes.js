import express from "express";
import {  getUser } from "../controller/userController.js";

const router = express.Router()

router.post("/", getUser)
// router.post("/", createGoal)
// router.put("/", updateGoal)

export default  router