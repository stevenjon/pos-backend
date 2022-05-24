import express from "express";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import ingredientRoutes from "./routes/ingredientRoutes.js";
import mealRoutes from "./routes/mealRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import ingredientIncomeRoutes from "./routes/ingredientIncomeRoutes.js";
import reportsRoutes from "./routes/reportsRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import clientPaymentRoutes from "./routes/clientPaymentRoutes.js";
import DB from "./config/db.js";
import cors from "cors";
import { getAllData } from "./controller/allDataController.js";

// middlewares

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
DB();
app.use(cors());

// routes

app.use("/users", userRoutes);

app.use("/categories", categoryRoutes);
app.use("/ingredients", ingredientRoutes);
app.use("/meals", mealRoutes);
app.use("/orders", orderRoutes);
app.use("/ingredients_income", ingredientIncomeRoutes);
app.use("/reports", reportsRoutes);
app.use("/clients", clientRoutes);
app.use("/client-payments", clientPaymentRoutes);


app.post("/all-data", getAllData)


app.get("/", (req, res) => {
    res.json({ text: "hello froom backend" })
})


const PORT = process.env.PORT || 5001


app.listen(PORT, () => {
    console.log("server started");
})
