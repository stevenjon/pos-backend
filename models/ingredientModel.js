import mongoose from "mongoose";


const Schema = mongoose.Schema({
    name: {
        type: String,
        required:[true, "Please add a name"]
    },
    purchase_type: {
        type: Number,
        required:[true, "Please add a name"]
    },
}, {
    timestamps: true
})


export default mongoose.model("ingredients", Schema)