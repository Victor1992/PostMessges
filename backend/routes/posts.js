const Post = require('../models/post');

const express = require('express');

const router = express.Router();

const checkAuth = require("../middleware/check-auth");

router.get("", (req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: 'Posts fetched Successfully!!',
            posts: documents
        });
    });
});
router.get("/:id", (req, res) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "Post not found"
            });
        }
    })
})

router.put("/:id", checkAuth, (req, res) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        creator: req.userData.userId
    });
    Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post)
        .then(result => {
            if (result.nModified > 0) {
                res.status(200).json({ message: "Update Successful" });
            }
            else {
                res.status(401).json({ message: "Not Authorized" });
            }
        })
})

router.post("", checkAuth, (req, res, next) => {

    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        creator: req.userData.userId
    });
    post.save().then(createdPost => {
        res.status(201).json({
            message: "Possts added successfully",
            postId: createdPost._id
        });
    });

});


router.delete("/:id", checkAuth, (req, res) => {
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
        if (result.n > 0) {
            res.status(200).json({ message: "Post Deleted" });
        }
        else {
            res.status(401).json({ message: "Not Authorized" });
        }
    });
});

module.exports = router;