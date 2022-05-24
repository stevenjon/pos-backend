import mongoose from "mongoose";


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required:[true, "Please add a name"]
    },
    price: {
        type: Number,
        required:[true, "Please add a name"]
    },
    category_id: {
        type: String,
        required:[true, "Please add a name"]
    },
    img: String,
    ingredients: {
        type: Array,
        required: [true, "Please add ingredients"]
    }
}, {
    timestamps: true
})


export default mongoose.model("meals", categorySchema)