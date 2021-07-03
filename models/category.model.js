const mongoose = require('mongoose');
var validator = require("email-validator");

var categorySchema = new mongoose.Schema({
    ID: {
        type: String,
        required: 'This field is required'
    },
    Category_Name: {
        type: String
    },
    Desciption: {
        type: String
    }
})

//custom validation for email

// categorySchema.path('email').validate((val) => {
//     return validator.validate(val);
// }, 'Invalid Email');

mongoose.model('Category', categorySchema);