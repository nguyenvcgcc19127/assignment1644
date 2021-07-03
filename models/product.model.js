const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    Product_ID: {
        type: String,
    },
    Product_Name: {
        type: String
    },
    Quantity: {
        type: String
    },
    Price: {
        type: String
    },
    Description: {
        type: String
    },
    imagename: {
        type: String
    } 
})

mongoose.model('Product', productSchema);