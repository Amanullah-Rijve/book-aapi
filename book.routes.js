import { Router } from "express";
import Book from "../models/book.model.js";

const router = Router();

// Middleware
const findBook = async (req,res,next)=>{
    try {
        const book = await Book.findById(req.params.id);
        // validation
        if(!book){
            return res.status(404).json({
                seccess: false,
                message: 'Book not found'
            });
        }

        req.book = book;
        next();
    } catch (error) {
        // invalid mongo id
        if(error.name ==='CastError'){
            return res.status(400).json({
                seccess: false,
                message: 'Ivalid ID'
            });
        }
        next(error);
    }
};

// Get routes
router.get('/',async(req,res,next)=>{
    try {
        const books = await Book.find().sort({createdAt:-1});

        res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (error) {
        next(error);
    }
});

//  GET by id
router.get('/:id',findBook,(req,res)=>{
    res.status(200).json({
        success: true,
        data: req.book
    });
});

// Post
router.post('/',async(req,res,next)=>{
    try {
        const {tittle,author,quantity,genre} = req.body;

        const book = await Book.create({
            tittle,author,quantity,genre
        });
        
        res.status(201).json({
            success:  true,
            message: 'Book added',
            data: book
        });

    } catch (error) {
        //  mongo validation
        if(error.name === 'ValidationError'){
            const message = Object.values(error.errors).map(e=>e.message)
            return res.status(400).json({
                success: false,
                message: message.json(', ')
            });
            next(error);
        }
    }
})


