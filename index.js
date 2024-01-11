//this file is the entry point
//importing the required modules
//we can use import when we change add type to module in package.json
//express is used to create server and serve the requests
import express from "express"
//cors is used to communicate to another origin
import cors from "cors"
//bodyparser is used to read the request body
import bodyParser from "body-parser"
//cookieparser is used to parse the cookies (read and write)
import cookieParser from "cookie-parser"
//importing config of dotenv it used to use environment variables in app
import 'dotenv/config'
//importing the routers
import userRouter from "./routes/userRoute.js"
//configuration function
import { connectToDb } from "./config/dbConfig.js"
import bookRouter from "./routes/bookRoute.js"

//create instance of express
const app = express()
//using bodyparser cookieparser and cors
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


//declaring routes

//user route
app.use('/', userRouter)
//whenerver a request on /+ path in userRouter with specific method comes it will send to its controller

//book route
app.use('/books', bookRouter)



//declaring the port if the port is available in environemt variable it take it otherwise sets 4000
const port = process.env.PORT || 4000;
app.listen(port, () => {
    //calling connect to db function to establish the connection
    connectToDb()
    console.log(`Server is running on port ${port}`)
})
