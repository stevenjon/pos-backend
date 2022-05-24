import express from "express";
import {
  get,
  create,
  edit,
  destroy,
} from "../controller/clientPaymentController.js";

const router = express.Router();

router.get("/", get);
router.post("/", create);
router.put("/", edit);
router.delete("/:id", destroy);

export default router;
