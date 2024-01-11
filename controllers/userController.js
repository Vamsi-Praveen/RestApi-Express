//this is login controller for login route 
//the function takes request and response object request object contains the request from client
//response object is used to send the response to client

//importing the usermodel for checking and inserting the data
import User from '../models/userModel.js'
//importing the bcrypt libarary for hashing and comparing the passwords
import bcrypt from "bcrypt"
//importing jwt from tokens
import jwt from "jsonwebtoken"

export const Login = async (req, res) => {
    //for error handling we use try catch block
    try {
        //first we need to get the username and password coming from client in form of request
        //all the data sending is passed over request object i.e res.body
        //for reading the body we used bodyparser at index.js file
        const { username, password } = req.body;
        //check if user exists in the database or not
        //it will take some time to execute so we used await
        //first check for username and password 
        if (username == '' || username == null && password == '' || password == null) {
            return res.status(400).json({ "Error": "Invalid" })
        }
        await User.findOne({ username: username })
            .then(async (data) => {
                //after getting the promise
                if (!data) {
                    //if there is no data means user is not exists
                    return res.status(404).json({ "message": "UserName not Exists" });
                }
                //if the data is present check the password is same as that saved on db
                //comparing the userentered password with the password hash in db
                bcrypt.compare(password, data.password, (err, result) => {
                    if (err) {
                        return res.status(500).send("Internal Server Error")
                    }
                    ///if no result that means passowrd is invalid
                    if (!result) {
                        return res.status(400).send("Incorrect Password")
                    }
                    //password also matched then we need to generate the jwt token in token we store _id
                    const token = jwt.sign({ id: data._id }, process.env.JWT_SECRET,{expiresIn:60});
                    //here we are creating a token with id and here we need to specify a secret key
                    //that secret key is stroing inside the .env (environment varibles)
                    //after geting the token we need to send the token in cookie as response
                    return res.cookie('TOKEN', token, { HttpOnly: true }).status(200).json({ "message": "Login Success" })

                })

            })
            .catch((er) => {
                //if incase of any error
                return res.status(500).json({ "messsage": "Internal Server Error" });
            })


    } catch (error) {
        //if incase any error on the try back it will throw here
        console.log(error)
        //sending error as a response to user
        return res.status(500).json({ error: error })
    }
}

export const Register = async (req, res) => {
    try {
        //first we need to get the username and password ,name coming from client in form of request
        //all the data sending is passed over request object i.e res.body
        //for reading the body we used bodyparser at index.js file
        const { name, username, password } = req.body;
        if (username == '' || username == null && password == '' || password == null && name == '' || name == null) {
            return res.status(400).json({ "Error": "Invalid" })
        }
        //it will take some time to execute so we used await 
        //check if username already exists in the database or not
        const isUserExists = await User.exists({ username: username })
        //exists return false if no data if data it give data

        if (!isUserExists) {
            //checking that there is no username
            //we need to hash the password send the user
            const hashedPassword = await bcrypt.hash(password, 10)
            //creating an object for new record
            const user = new User({
                name: name,
                password: hashedPassword,
                username: username
            })
            //saving the data to database
            await user.save().then((data) => {
                //sending response as success
                return res.send({ success: 1 }).status(200)
            }).catch((err) => {
                //sending error as reponse
                return res.send({ error: "Internal Server Error" }).status(500)
            })
        }
        else {
            return res.status(400).send("Username Already Exists")
        }
    } catch (error) {
        //if incase any error on the try back it will throw here
        console.log(error)
        //sending error as a response to user
        return res.status(500).json({ error: error })
    }
}