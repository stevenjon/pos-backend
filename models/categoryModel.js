import mongoose from "mongoose";


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required:[true, "Please add a name"]
    },
}, {
    timestamps: true
})


export default mongoose.model("category", categorySchema)