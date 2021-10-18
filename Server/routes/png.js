const express = require('express')
const multer = require('multer')

const router = new express.Router()

const path = './upload/'

router.get('/v1', (req, res) => {
    res.send("Hello World")
})

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path);
     },
    filename: function (req, file, cb) {
        cb(null , 'image.png');
    }
});

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
    storage: storage
 })

router.post('/v1/png', upload.single('certificate'), async(req, res) => {
    try{  
       res.status(200).send("Okay!! Samriddh")
    }

    catch(e){
        res.status(400).send(e)
    }
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

module.exports =  router