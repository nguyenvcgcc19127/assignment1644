const mongoose = require('mongoose');
//const url = "mongodb://localhost:27017/EmployeeDB";
const url = "mongodb+srv://nguyenvo:0944778511@cluster0.8e9yf.mongodb.net/test"
mongoose.connect(url,{useNewUrlParser:true},(err) => {
    if(!err){ console.log("MongoDB Connection Succeeded");}
    else{
        console.log("An Error Occured");
    } 
})

require('./employee.model');
require('./category.model');
require('./product.model');