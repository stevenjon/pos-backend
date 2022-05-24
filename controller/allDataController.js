import categoryModel from "../models/categoryModel.js"
import clientsModel from "../models/clientsModel.js";
import ingredientModel from "../models/ingredientModel.js";
import mealModel from "../models/mealModel.js";

export const getAllData = async (req, res) => {
  const categories = await categoryModel.find();
  const ingredients = await ingredientModel.find();
  const meals = await mealModel.find();
  const clients = await clientsModel.find();
  res.json({
    categories,
    ingredients,
    meals,
    clients,
  });
};
