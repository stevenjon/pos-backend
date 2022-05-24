import mongoose from "mongoose";


const Schema = mongoose.Schema(
  {
    meals: {
      type: Array,
      required: [true, "Please add a meals"],
    },
    order: Number,
    client_id: String,
    total_price: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("orders", Schema);