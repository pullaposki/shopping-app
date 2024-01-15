// Import required modules
const express = require("express");
const itemModel = require("../models/item");
const console = require("console");

// Create a new router
let router = express.Router();

// Define the GET method for "/shopping" route 
router.get("/shopping", function (req,res){
    // Fetch all items from the database
    itemModel.find().then(function(items){
        return res.status(200).json(items)
    }).catch(function(err){
        console.log(err);
        return res.status(500).json({"Message": "Internal server error"});
    })
})

// Define the POST method for "/shopping" route
router.post("/shopping", function (req,res){
    // Check for body in request
    if (!req.body){
        return res.status(400).json({"Message":"Bad request"})
    }
    // Check for type in request
    if (!req.body.type){
        return res.status(400).json({"Message":"Bad request"})
    }

    // Create a new item with the request data
    let item = new itemModel({
        type:req.body.type,
        count:req.body.count,
        price:req.body.price
    })

    // Save new item to the database
    item.save().then(function(item) {
        // On success, respond with 201 status & saved item in JSON
        return res.status(201).json(item);
    }).catch(function (err){
        // On failure, log error & respond with 500 Internal Server Error
        console.log(err);
        return res.status(500).json({"Message": "Internal server error"});
    })
})

// Define the DELETE method for "/shopping/:id" route
router.delete("/shopping/:id",function(req,res){
    // Delete one item with the given id from the request parameters
    itemModel.deleteOne({"_id":req.params.id}).then(function(stats){
        console.log(stats);
        return res.status(200).json({"Message":"success"})
    }).catch(function(err){
        console.log(err);
        return res.status(500).json({"Message":"Internal server error"})
    })
})

// Define the PUT method for "/shopping/:id" route
router.put("/shopping/:id", function(req, res){
    // Check for body and required fields in the request
    if (!req.body || !req.body.type || !req.body.count || !req.body.price){
        return res.status(400).json({"Message":"Bad request"})
    }
    // Create a new item with the request data
    let item = new itemModel({
        type:req.body.type,
        count:req.body.count,
        price:req.body.price
    })

    // Replace one item with the given id and the new item in the database
    itemModel.replaceOne({"_id": req.params.id}, item).then(function(stats){
        // Log the result, then respond with 200 status & success message in JSON
        console.log(stats);
        return res.status(200).json({"Message":"Success"})
    }).catch(function(err){
        // On failure, log error & respond with 500 Internal Server Error
        console.log(err);
        return res.status(500).json({"Message":"Internal server error"})
    })
})

// Export router to be used in other modules
module.exports = router;