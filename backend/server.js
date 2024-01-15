const express = require("express");
const mongoose = require("mongoose");
const shoppingRoute = require("./routes/shopping-route")

// Create an express application
let app = express();

const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

// Use express.json() middleware for parsing JSON request bodies
app.use(express.json());

const url = `mongodb+srv://${mongo_user}:${mongo_password}@testiklusteri.bwokbqd.mongodb.net/shoppingdb?retryWrites=true&w=majority`

mongoose.connect(url).then(
    () => console.log("Connected to MongoDB"),
    (err) => console.log("Failed to connect to MongoDB. Reason",err)
)

// Use our defined "shoppingRoute" for any requests that start with "/api"
app.use("/api",shoppingRoute);

let port = process.env.PORT || 3000;

app.listen(port);

console.log("Running in port",port);