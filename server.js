const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

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

// API Routes

app.get("/api/workouts/range", (req, res) => {
    // Get all workout data
    db.Workout.find()
        .then(result => {
            res.json(result);
        })
        .catch({ message } => {
            console.log(message);
        });
});

app.get("/api/workouts", (req, res) => {
    // Returns workouts in ascending order by day
    db.Workout.find().sort({ day: 1 })
        .then(result => {
            res.json(result);
        })
        .catch({ message } => {
            console.log(message);
        });
});

app.post("/api/workouts", (req, res) => {
    // Create a new workout
    db.Workout.create(req.body)
        .then(result => {
            res.json(result);
        })
        .catch({ message } => {
            console.log(message);
        });
});

app.put("/api/workouts/:id", (req, res) => {
    // Updates the specified workout
    db.Workout.findByIdAndUpdate(req.params.id, req.body)
        .then(result => {
            res.json(result);
        })
        .catch({ message } => {
            console.log(message);
        });
});

// Start the express server
app.listen({ port: PORT }, err => {
    if (err) {
        throw err;
    }
    console.log("App listening on localhost:" + PORT)
});
