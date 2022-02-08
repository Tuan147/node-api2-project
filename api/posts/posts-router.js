// implement your posts router here
const  { Router } = require('express');

const Posts = require('./posts-model');

const router = Router();

router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error not retrieving posts'
            })
        })
});

router.get('/:id', (req,res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: 'Post not found'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Error retrieving the post'})
        })
});

router.post('/', (req, res) => {
    Posts.add(req.body)
        .then(post => {
            res.status(500).json(post)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error adding the post'
            })
        })
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    Posts.update(req.params.id, changes)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: 'The post could not be found'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error updating the post'
            })
        })
});

router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({
                    message: 'The post has been removed'
                })
            } else {
                res.status(404).json({
                    message: 'The post could not be found'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error removing the post'
            })
        })
});

router.get('/:id/commnets', (req, res) => {
    Posts.findPostsComments(req.params.id)
        .then(comments => {
            if (comments.length > 0) {
                res.status(200).json(comments)
            } else {
                res.status(404).json({
                    message: 'No comments for this post'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error retrieving comments for this post'
            })
        })
});

module.exports = router;