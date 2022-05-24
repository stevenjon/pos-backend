export default async (model, document_id, table_name) => {
  return await model.deleteMany({ document_id, table_name });
};
