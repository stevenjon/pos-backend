import mongoose from "mongoose";


const Schema = mongoose.Schema({
    ingredients: {
        type: Array,
        required:[true, "Please add a meals"]
    },
    order: Number,
    total_price: Number
}, {
    timestamps: true
})


export default mongoose.model("ingredients_income", Schema)