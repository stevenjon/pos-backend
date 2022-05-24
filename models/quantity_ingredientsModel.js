import mongoose from "mongoose";


const Schema = mongoose.Schema({
    ingredient_id: {
        type: String,
        required:[true, "Please add a meals"]
    },
    killo: Number,
    dona: Number,
    in_out: Number,
    document_id: String,
    table_name: String

}, {
    timestamps: true
})


export default mongoose.model("quantity_of_ingredients", Schema)