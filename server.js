const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// Configure express middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define express routes

// HTML routes

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/stats.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/exercise.html"));
});

// Start the express server
app.listen({ port: PORT }, err => {
    if (err) {
        throw err;
    }
    console.log("App listening on localhost:" + PORT)
});
