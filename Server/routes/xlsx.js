const express = require('express')
const multer = require('multer')
const router = new express.Router()

const fileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(xlsx)$/)){
        return cb(new Error('Please upload a .xlsx file'), false)
    }

    cb(undefined, true)
}

const upload = multer({ 
    limits: {
    fileSize: 1024 * 1024 * 12
    },
    fileFilter,
    dest: '../uploads/'
 })

router.post('/v1/xlsx', upload.single('file'), async(req, res) => {
    res.status(200).send(req.file)

}, (error, req, res, next) => {
    res.status(400).send({ error })
})

module.exports = router

// const data = new UIN