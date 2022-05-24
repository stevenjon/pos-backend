import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    telefon: String,
    izoh: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("clients", categorySchema);
