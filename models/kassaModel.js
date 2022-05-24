import mongoose from "mongoose";


const Schema = mongoose.Schema({
    summa  : Number,
    in_out: Number,
    document_id: String,
    table_name: String
    
}, {
    timestamps: true
})


export default mongoose.model("kassa", Schema)