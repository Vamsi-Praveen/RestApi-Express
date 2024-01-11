//importing jwt
import jwt from "jsonwebtoken"
//this is a middleware function which helps to verify the token is valid or invalid
export const verifyToken = async (req, res, next) => {
    try {
        //take the cookie from request 
        const { TOKEN } = req.cookies;
        if (!TOKEN) {
            //if token cookie is not found that means user is not logged in
            return res.status(300).send({ "Error": "User Login required" })
        }
        //if token exists and verify the token
        const decode = jwt.verify(TOKEN, process.env.JWT_SECRET)
        if (!decode) {
            //if the token is expired or there is no data in token
            return res.status(400).json({ "message": "Invalid Token" })
        }
        //sending the userid that we decoded to next response
        req.userId = decode._id
        //calling the next function by help of next()
        next()

    } catch (error) {
        //if incase of error i.e token expired send response to user
        return res.status(400).send("Token Expired");
    }
}