import clientDebtsModel from "../models/clientDebtsModel.js";
import kassaModel from "../models/kassaModel.js";
import Model from "../models/clientPaymentModel.js";
import deleteDocument from "../utils/deleteDocument.js";

export const get = async (req, res) => {
  const data = await Model.find();
  res.json(data);
};

export const create = async (req, res) => {
  if (req.body.client_id) {
    const data = await Model.create(req.body);

    const kassaXis = {
      summa: req.body.summa,
      in_out: 1,
      document_id: data._id,
      table_name: "client_payments",
    };
    await kassaModel.create(kassaXis);

    if (req.body.client_id) {
      const debt = {
        summa: req.body.summa * -1,
        client_id: req.body.client_id,
        document_id: data._id,
        table_name: "client_payments",
      };
      await clientDebtsModel.create(debt);
    }

    res.json(data);
  }
};

export const edit = async (req, res) => {
  const data = await Model.updateOne({ _id: req.body._id }, req.body);

  if (data.modifiedCount == 1) {
    const modified = await Model.find({ _id: req.body._id });
    if (modified.length > 0) {
      await deleteDocument(kassaModel, modified[0]._id, "client_payments");
      await deleteDocument(
        clientDebtsModel,
        modified[0]._id,
        "client_payments"
      );

      const kassaXis = {
        summa: req.body.summa,
        in_out: 1,
        document_id: modified[0]._id,
        table_name: "client_payments",
      };
      await kassaModel.create(kassaXis);

      if (req.body.client_id) {
        const debt = {
          summa: req.body.summa * -1,
          client_id: req.body.client_id,
          document_id: modified[0]._id,
          table_name: "client_payments",
        };
        await clientDebtsModel.create(debt);
      }

      res.json(modified[0]);
    }
  }
};

export const destroy = async (req, res) => {
  const data = await Model.deleteOne({ _id: req.params.id });
  if (data.deletedCount == 1) {
    await deleteDocument(kassaModel, req.params.id, "client_payments");
    await deleteDocument(clientDebtsModel, req.params.id, "client_payments");
    res.json({ _id: req.params.id });
  }
};
