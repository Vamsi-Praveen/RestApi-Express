//this is user route means the routes regarding to user like login register is created here
//we need express.Router() instance for routing
import express from "express"
//importing the controller for defined route
import { Login, Register } from "../controllers/userController.js";
//making instance of express Router
const userRouter = express.Router();

//declaring routes

//whenever we got post request on login route it will execute its given controller which is defined in controllers
userRouter.post('/login', Login);
userRouter.post('/register', Register);

//exporting the router to access in other files
export default userRouter;