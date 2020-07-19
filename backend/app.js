const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

app.use(bodyParser.json());

posts: [];

mongoose.connect("mongodb+srv://varun:varun1992@cluster0-nltoj.mongodb.net/postMessagesAngular?retryWrites=true&w=majority")
    .then(() => {
        console.log("Connected to MONGODB");
    })
    .catch((error) => {
        console.log('Connection Failed!!!' + error);
    });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,PUT, POST, PATCH, DELETE, OPTIONS"
    );

    next();

});
app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;

