import countity_ingredientsModel from "../models/quantity_ingredientsModel.js";
import Model from "../models/ingredientIncomeModel.js";
import kassaModel from "../models/kassaModel.js";

export const get = async (req, res) => {
  const data = await Model.find();
  res.json(data);
};

export const create = async (req, res) => {
  if (req.body.ingredients?.length > 0) {
    const obj = {
        ingredients: req.body.ingredients,
        order: String(new Date().getTime() - 1653000000000).substring(0,5) * 1 + 1,
        total_price: req.body.ingredients.reduce(
            (acc, d) => acc + d.price * d.count,
            0
        ),
    };
      const data = await Model.create(obj);
      const couantityIngs = req.body.ingredients.map(ing => {
          return {
              ingredient_id: ing._id,
              killo: ing.purchase_type == 1 ? ing.count * 1 : 0,
              dona: ing.purchase_type == 2 ? ing.count * 1 : 0,
              in_out: 1,
              document_id: data._id,
              table_name: "ingredients_income"
          }
      })

      await countity_ingredientsModel.insertMany(couantityIngs)

      const kassaXis = {
          summa: obj.total_price  * -1,
          in_out: 2,
          document_id: data._id,
          table_name:"ingredients_income"
      } 
      await kassaModel.create(kassaXis)

    res.json(data);
  }
};

export const edit = async (req, res) => {
  const data = await Model.updateOne({ _id: req.body._id }, req.body);

  if (data.modifiedCount == 1) {
      const modified = await Model.find({ _id: req.body._id });
    if (modified.length > 0) {
      res.json(modified[0]);
    }
  }
};

export const destroy = async (req, res) => {
  const data = await Model.deleteOne({ _id: req.params.id });
  if (data.deletedCount == 1) {
    res.json({ _id: req.params.id });
  }
};
