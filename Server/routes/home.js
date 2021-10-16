const express = require('express')
const router = new express.Router()
const multer = require('multer')
const PNG = require('../models/png')

router.get('/v1', (req, res) => {
    res.send("Hello World")
})

const upload = multer({
    limits: {
       fileSize: 1000000
    },

    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/v1/png', upload.single('certificate'), (req, res) => {
    
})

module.exports = router