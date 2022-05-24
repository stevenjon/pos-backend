import clientDebtsModel from "../models/clientDebtsModel.js";
import kassaModel from "../models/kassaModel.js";
import Model from "../models/orderModel.js";
import quantity_ingredientsModel from "../models/quantity_ingredientsModel.js";
import deleteDocument from "../utils/deleteDocument.js";

export const get = async (req, res) => {
  const data = await Model.find();
  res.json(data);
};

export const create = async (req, res) => {
  if (req.body.meals?.length > 0) {
    const obj = {
      meals: req.body.meals,
      order:
        String(new Date().getTime() - 1653000000000).substring(0, 5) * 1 + 1,
      total_price: req.body.meals.reduce(
        (acc, d) => acc + d.price * d.count,
        0
      ),
    };
    const data = await Model.create(obj);
    const quantityIngs = [];
    req.body.meals.forEach(meal => {
      meal.ingredients.forEach(ing => {
        quantityIngs.push({
          ingredient_id: ing._id,
          killo: ing.purchase_type == 1 ? ing.count * meal.count * -1 : 0,
          dona: ing.purchase_type == 2 ? ing.count * meal.count * -1 : 0,
          in_out: 2,
          document_id: data._id,
          table_name: "orders",
        });
      });
    });

    await quantity_ingredientsModel.insertMany(quantityIngs);

    const kassaXis = {
      summa: obj.total_price,
      in_out: 1,
      document_id: data._id,
      table_name: "orders",
    };
    await kassaModel.create(kassaXis);

    if (req.body.client_id) {
      const debt = {
        summa: obj.total_price * 1,
        client_id: req.body.client_id,
        document_id: data._id,
        table_name: "orders",
      };
      await clientDebtsModel.create(debt);
    }

    res.json(data);
  }
};

export const edit = async (req, res) => {
  if (req.body.meals?.length > 0) {
    const obj = {
      meals: req.body.meals,
      client_id: req.body.client_id,
      total_price: req.body.meals.reduce(
        (acc, d) => acc + d.price * d.count,
        0
      ),
    };

    const data = await Model.updateOne({ _id: req.body._id }, obj);

    if (data.modifiedCount == 1) {
      const modified = await Model.find({ _id: req.body._id });
      if (modified.length > 0) {
        const editedData = modified[0];

        // delete documents
        await deleteDocument(
          quantity_ingredientsModel,
          editedData._id,
          "orders"
        );
        await deleteDocument(kassaModel, editedData._id, "orders");
        await deleteDocument(clientDebtsModel, editedData._id, "orders");

        // create documents

        const quantityIngs = [];
        req.body.meals.forEach(meal => {
          meal.ingredients.forEach(ing => {
            quantityIngs.push({
              ingredient_id: ing._id,
              killo: ing.purchase_type == 1 ? ing.count * meal.count * -1 : 0,
              dona: ing.purchase_type == 2 ? ing.count * meal.count * -1 : 0,
              in_out: 2,
              document_id: editedData._id,
              table_name: "orders",
            });
          });
        });

        await quantity_ingredientsModel.insertMany(quantityIngs);

        const kassaXis = {
          summa: editedData.total_price,
          in_out: 1,
          document_id: editedData._id,
          table_name: "orders",
        };
        await kassaModel.create(kassaXis);

        if (req.body.client_id) {
          const debt = {
            summa: editedData.total_price * 1,
            client_id: req.body.client_id,
            document_id: editedData._id,
            table_name: "orders",
          };
          await clientDebtsModel.create(debt);
        }

        res.json(editedData);
      }
    }
  }
};

export const destroy = async (req, res) => {
  const data = await Model.deleteOne({ _id: req.params.id });
  if (data.deletedCount == 1) {
    // delete documents
    await deleteDocument(quantity_ingredientsModel, req.params.id, "orders");
    await deleteDocument(kassaModel, req.params.id, "orders");
    await deleteDocument(clientDebtsModel, req.params.id, "orders");
    res.json({ _id: req.params.id });
  }
};
