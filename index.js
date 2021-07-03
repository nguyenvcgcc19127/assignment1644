require('./models/db');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const employeeController = require('./controller/employeeController');
const categoryController = require('./controller/categoryController');
const productController = require('./controller/productController');

var app = express();
app.use(express.static("public/images"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.set('views', path.join(__dirname, '/views/'))

app.engine('hbs', expressHandlebars({
    extname: 'hbs',
    defaultLayout: 'mainLayouts',
    layoutsDir: __dirname + '/views/layouts/',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))

app.get('/', function (req, res) {
    res.render('home', { msg: 'This is home page' });
})
app.set('view engine', 'hbs');

// app.get('/products', (req, res) => {
//     res.render('products');
// });
// app.get('/addproduct', (req, res) => {
//     res.render('addproduct');
// });
// app.get('category/category', (req, res) => {
//     res.render('category');
// });
// app.get('/addcategory', (req, res) => {
//     res.render('addcategory');
// });

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server is listening on Port 3000");
})

app.use('/employee', employeeController);
app.use('/category', categoryController);
app.use('/product', productController);