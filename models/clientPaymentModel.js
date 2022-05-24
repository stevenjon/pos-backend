import mongoose from "mongoose";

const Schema = mongoose.Schema(
  {
    summa: Number,
    client_id: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("client_payments", Schema);
