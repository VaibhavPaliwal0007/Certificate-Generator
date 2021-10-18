const express = require('express')
const multer = require('multer')
const XLSX = require('xlsx')
const getCertificate = require('./script')
const sharp = require('sharp')
const router = new express.Router()

const fileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(xlsx)$/)){
        return cb(new Error('Please upload a .xlsx file'), false)
    }

    cb(undefined, true)
}

const img = process.cwd() + `/upload/image.png`
// const img = sharp(name).png().toBuffer()

const upload = multer({ 
    limits: {
    fileSize: 1024 * 1024 * 12
    },
    fileFilter,
 })

router.post('/v1/xlsx', upload.single('file'), async(req, res) => {
    
    var file = XLSX.read(req.file.buffer, { type:'buffer', bookType: "xlsx" })
    let pdfStream

    res.setHeader("Content-Type", "application/pdf")
    res.setHeader("Content-Disposition", `attachment; filename=${img}.pdf`)

    for(let idx = 0; idx < 1; idx++){
        for(obj in file.Strings[idx]){
           if(obj == "h" && file.Strings[idx][obj] != (undefined || "")) 
             pdfStream = await getCertificate(img, file.Strings[idx][obj], res)
        }
    }

    
    res.setHeader("Content-Length", Buffer.byteLength(pdfStream))
    // res.status(200)
    // .writeHead(200, {
    //   'Content-Length': Buffer.byteLength(pdfStream),
    //   'Content-Type': 'application/pdf',
    //   'Content-disposition': 'attachment;filename=test.pdf',
    // })
    res.end(pdfStream);

    // res.status(200).send()

}, (error, req, res, next) => {
    res.status(400).send({ error })
})


module.exports = router

// const data = new UIN