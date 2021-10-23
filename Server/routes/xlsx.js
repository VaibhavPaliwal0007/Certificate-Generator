const express = require('express')
const multer = require('multer')
const XLSX = require('xlsx')
const generateZipforCertificate = require('../functions/generateZip')

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
 })

router.post('/v1/xlsx', upload.single('file'), async(req, res) => {
    
    try{    
        var file = XLSX.read(req.file.buffer, { type:'buffer', bookType: "xlsx" })
        let bufferStream

        await generateZipforCertificate(file, bufferStream)

        res.set({
            'Content-Type': 'application/zip',
            'Content-Disposition': 'attachment; filename="test.zip"'
          })
         .status(200)
         .download(`${process.cwd()}/upload/test.zip`)
    }

    catch(e){
        res.status(400).send(e)
        console.log(e)
    }
})

module.exports = router