import mongoose from "mongoose";

// schema
const bookSchema = new mongoose.Schema(
    {
        tittle:{
            type: String,
            required: [true,'Title must'], // built-in validation
            trim: true  // space remove 
        },
        author:{
            type:String,
            required: [true,'Author must'],
            trim: true
        } ,
        quantity:{
            type: Number,
            required: [true,'Quantity must'],
            min:[1,'minimum 1']
        },
        genre:{
            type: String,
            enum: ['Fiction','Non-Fiction','Tech','Science'],
            default: 'Tech'
        }
    },
    {
        timeseries:true // created at and time info
    }
);

// Model 
const Book = mongoose.model('Book',bookSchema);

export default Book;