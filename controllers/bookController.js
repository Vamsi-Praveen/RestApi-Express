//importing the book model
import Books from "../models/bookModel.js";


export const getAllBooks = async (req, res) => {
    try {
        await Books.find().then((data) => {
            //sending the whole books data as a response to request
            return res.json({ "books": data }).status(200);
        })
            .catch((err) => {
                //sending the error message
                return res.json(400).json({ "error": err })
            })
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

export const getBookById = async (req, res) => {
    try {
        //try to get the parameters or id that is passed from url
        const { id } = req.params;
        if (!id) {
            //if we didnt specify the paramter
            return res.status(400).json({ 'error': "id parameter required" });
        }
        //if parameter is exist then check the book realted to the passed paramater in db
        await Books.findOne({ _id: id })
            .then((data) => {
                //if the data about particular id is not found
                if (!data) {
                    return res.status(200).json({ "message": "No Book with given id" })
                }
                //sending the data to client
                return res.status(200).json({ "book": data })
            })
            .catch((er) => {
                return res.status(400).json({ "message": "invalid id" })
            })
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

export const addBook = async (req, res) => {
    //for adding the book we need to fetch the details of the book from request
    const { title, author, no_of_pages, price, published_year } = req.body;

    //check the all feilds are not empty

    //creating an object for new record
    const book = new Books({
        title: title,
        author: author,
        no_of_pages: no_of_pages,
        price: price,
        published_year: published_year
    })
    //saving the data to database
    await book.save().then((data) => {
        //sending response as success
        return res.send({ success: 1, "message": "Book Inserted Succesfully" }).status(200)
    }).catch((err) => {
        //sending error as reponse
        return res.send({ error: "Internal Server Error" }).status(500)
    })


}