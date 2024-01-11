//importing mongoose
import mongoose from "mongoose"
//creating schema
const userSchema = new mongoose.Schema({
    //creating feilds
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//creating model from the schema and export it
export default mongoose.model("User", userSchema)
