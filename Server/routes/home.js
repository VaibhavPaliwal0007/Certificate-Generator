const express = require('express')
const Jimp = require('jimp')
const sharp = require('sharp')
const multer = require('multer')
const Png = require('../models/png')

const router = new express.Router()

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

    //     if(file.originalname.match(/\.(jpg|jpeg)$/)){
    //         try{
    //             let convertedFile = file.originalname.replace(/\.(jpg|jpeg)$/, '.png')
    //             const File = await Jimp.read(file.originalname)

    //             return await File.write(convertedFile)
    //         }
            
    //         catch(e){
    //             return console.log(e)
    //         }
    //     }

        cb(undefined, true)
    }
})

router.post('/v1/png', upload.single('certificate'), async(req, res) => {
       const buffer = await sharp(req.file.buffer).png().toBuffer()
       const certificate =  new Png({
           name: req.file.originalname,
           certificate: buffer
        })

       await certificate.save()
       res.status(200).send({ certificate })

}, (error, req, res, next) => {
    res.status(400).send({ error : error.message })
})

router.get('/v1/getpng', async(req, res) => {
   
   try { 
       const png = await Png.findById('616ad39a606bdd1251a6b294')

        if(!png || !png.certificate){
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(png.certificate)
   }

   catch(e){
       res.status(404).send(e)
   }
})

module.exports = router