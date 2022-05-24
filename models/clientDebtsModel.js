import mongoose from "mongoose";

const Schema = mongoose.Schema(
  {
    summa: Number,
    client_id: String,
    document_id: String,
    table_name: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("client_depts", Schema);
