import clientDebtsModel from "../models/clientDebtsModel.js";
import kassaModel from "../models/kassaModel.js";
import quantity_ingredientsModel from "../models/quantity_ingredientsModel.js";

export const getIngQuantity = async (req, res) => {
  const data = await quantity_ingredientsModel.aggregate([
    { $match: {} },
    {
      $group: {
        _id: "$ingredient_id",
        killo: { $sum: "$killo" },
        dona: { $sum: "$dona" },
      },
    },
  ]);
  res.json(data);
};

export const getKassa = async (req, res) => {
  const data = await kassaModel.aggregate([
    { $match: {} },
    { $group: { _id: null, total: { $sum: "$summa" } } },
  ]);
  res.json(data);
};

export const getDebts = async (req, res) => {
  const data = await clientDebtsModel.aggregate([
    { $match: {} },
    { $group: { _id: "$client_id", total: { $sum: "$summa" } } },
  ]);
  res.json(data);
};
