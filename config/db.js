import mongoose from "mongoose";


export default  async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://codapp:FCYaqKc07V1vpH2t@cluster0.izhwl.mongodb.net/test?retryWrites=true&w=majority")
        console.log("connected");
    } catch (error) {
        console.log(error);
    }
}