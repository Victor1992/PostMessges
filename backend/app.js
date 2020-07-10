const Post = require('./models/post');
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
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();

});

app.get("/api/posts", (req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: 'Posts fetched Successfully!!',
            posts: documents
        });
    });
});


app.post("/api/posts", (req, res, next) => {

    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    res.status(201).json({
        message: "Possts added successfully"
    });
});

module.exports = app;

