const mongoose = require('mongoose');

const prodSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        description : {
            type : String,
            required : true
        },
        category : {
            type : String,
            required : true
        },
        image : {
            type : String,
            required : true
        }

    },
    {
        versionKey : false,
        timestamps : true
    }
)

const Products = new mongoose.model("products", prodSchema);

exports.Products = Products;