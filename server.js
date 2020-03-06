const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// Configure express middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define express routes

// Root
app.get("/", (req, res) => {
    return res.send(path.join(__dirname, "/public/index.html"));
});

// Start the express server
app.listen({ port: PORT }, err => {
    if (err) {
        throw err;
    }
    console.log("App listening on localhost:" + PORT)
});
