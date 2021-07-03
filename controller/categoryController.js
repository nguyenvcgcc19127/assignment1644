const express = require('express');
const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("category/addcategory", {
        viewTitle: "Insert Category"
    })
})

router.post("/", (req, res) => {
    if (req.body._id == "") {
        insertRecord(req, res);
    }
    else {
        updateRecord(req, res);
    }
})

function insertRecord(req, res) {
    var category = new Category();
    category.ID = req.body.ID;
    category.Category_Name = req.body.Category_Name;
    category.Desciption = req.body.Desciption;

    category.save((err, doc) => {
        if (!err) {
            res.redirect('category/list');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("category/addcategory", {
                    viewTitle: "Insert Category",
                    category: req.body
                })
            }
            console.log("Error occured during record insertion" + err);
        }
    })
}

function updateRecord(req, res) {
    Category.findOneAndUpdate({ _id: req.body._id, }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('category/list');
        }
        else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("category/addcategory", {
                    viewTitle: 'Update Category',
                    category: req.body
                });
            }
            else {
                console.log("Error occured in Updating the records" + err);
            }
        }
    })
}

router.get('/list', (req, res) => {
    Category.find((err, docs) => {
        if (!err) {
            res.render("category/list", {
                list: docs
            })
        }
    })
})

router.get('/:id', (req, res) => {
    Category.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("category/addcategory", {
                viewTitle: "Update Category",
                category: doc
            })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/category/list');
        }
        else {
            console.log("An error occured during the Delete Process" + err);
        }
    })
})

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'ID':
                body['IDError'] = err.errors[field].message;
                break;
            case 'Category_Name':
                body['Category_NameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

module.exports = router;