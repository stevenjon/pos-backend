import express from "express";
import {
  getDebts,
  getIngQuantity,
  getKassa,
} from "../controller/reportsController.js";

const router = express.Router();

router.post("/ingredient-quantity", getIngQuantity);
router.post("/kassa", getKassa);
router.post("/client-debts", getDebts);

export default  router