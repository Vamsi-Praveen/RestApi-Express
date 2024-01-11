//importing mongoose
import mongoose from "mongoose"
//creating schema
const bookSchema = new mongoose.Schema({
    //creating feilds
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    no_of_pages: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    published_year: {
        type: String,
        required: true
    }

})

//creating model from the schema and export it
export default mongoose.model("Books", bookSchema)
