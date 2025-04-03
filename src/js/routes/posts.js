const express = require('express');
const router = express.Router();

// Route to handle the creation of a new post
router.post('/create-post', async (req, res) => {
    try {
        // Check if a file is uploaded
        if (!req.files || !req.files.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(req.files.file.tempFilePath);

        // Create a new post with caption and media URL
        const newPost = new Post({
            username: req.user ? req.user.username : "Anonymous", // Get from authenticated user
            caption: req.body.caption,
            media: result.secure_url, // The URL provided by Cloudinary
        });

        // Save the post to the database
        await newPost.save();

        // Redirect to the home page or send a success response
        res.redirect('/home');
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Error posting. Try again.');
    }
});

module.exports = router;