//this is user route means the routes regarding to user like login register is created here
//we need express.Router() instance for routing
import express from "express"
//importing the controller for defined route
import { addBook, getAllBooks, getBookById } from "../controllers/bookController.js";
//importing the validation middleware to validate the users based on token
import { verifyToken } from "../middlewares/verifyToken.js";

//making instance of express Router
const bookRouter = express.Router();

//declaring routes

//whenever we got post request on login route it will execute its given controller which is defined in controllers
//here for every route we need to pass another function that is middleware
//if the token is exist and valid only the main controller is called otherwise it returns with error
bookRouter.get('/getallbooks', verifyToken, getAllBooks);
bookRouter.get('/getbook/:id', verifyToken, getBookById);
bookRouter.post('/addBook', verifyToken, addBook);

//exporting the router to access in other files
export default bookRouter;