//importing the mongoose for connection establishment
import mongoose from "mongoose";

//creating a function that connects to database
export const connectToDb = async () => {
    //connecting to the database
    //URL is url of the mongodb it will store in .env file
    const URL = process.env.MONGODB_URL
    await mongoose.connect(URL)
        .then(() => {
            console.log("Database is connected")
        })
        .catch((err) => {
            console.log(err)
        })
}