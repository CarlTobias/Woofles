const express = require('express');
const router = express.Router();

const multer = require('../routes/multer');
const cloudinary = require('../routes/cloudinary');


// Route that uploads image to cloudinary using multer
router.post('/upload', multer.single('image'), function (req, res) {
    cloudinary.uploader.multer(req.file.path, function (err, result){
        if(err) {
            console.log(err);
            return res.status(500).json({
                success: false, 
                message: "Error"
            })
        }

        res.status(200).json({
            success: true, 
            message: "Uploaded!", 
            data: result
        })
    })
});

module.exports = router;