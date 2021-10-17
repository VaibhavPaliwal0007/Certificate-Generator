const express = require('express')
const sharp = require('sharp')
const multer = require('multer')

const router = new express.Router()

router.get('/v1', (req, res) => {
    res.send("Hello World")
})

// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, '../uploads')
//     },

//     filename: function(req, file, cb) {
//         cb(null, file.originalname)
//     },
// })

const fileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)){
        return cb(new Error('Please upload an image'), false)
    }

    if(file.size == 0){
        return cb(new Error('Please upload valid image'))
    }

    cb(undefined, true)
}

const upload = multer({ 
    limits: {
    fileSize: 1024 * 1024 * 10
    },
    fileFilter,
 })

router.post('/v1/png', upload.single('certificate'), async(req, res) => {
       const buffer = await sharp(req.file.buffer).png().toBuffer()
         
       console.log(req.file)

       res.set('Content-Type', 'image/png')
       res.status(200).send(buffer)

}, (error, req, res, next) => {
    res.status(400).send({ error })
})

// router.get('/v1/getpng', async(req, res) => {
   
//    try { 
//        const png = await Png.findById('616ad39a606bdd1251a6b294')

//         if(!png || !png.certificate){
//             throw new Error()
//         }

//         res.set('Content-Type', 'image/png')
//         res.send(png.certificate)
//    }

//    catch(e){
//        res.status(404).send(e)
//    }
// })

module.exports = router