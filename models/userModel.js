import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required:[true, "Please add a name"]
    },
    pincode: {
        type: String,
        required: [true, "please enter pincode"]
    },
    type: {
        type: Number,
        required: [true, "please enter a type"]
    }
}, {
    timestamps: true
})


export default mongoose.model("users", userSchema)