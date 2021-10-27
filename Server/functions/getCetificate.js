const PDFDocument = require('pdfkit')
const getStream = require('get-stream')
const generateZipforCertificate = require('./generateZip')
const fs = require('fs')

const img = process.cwd() + '/upload/image.png'

const getCertificate = async (name) =>{
        try{
            const doc = new PDFDocument({
                layout: "landscape",
                size: "A4",
            })

            doc.image(img, 0, 0, { width: 900 })

            doc.font(process.cwd() + '/fonts/DancingScript-VariableFont_wght.ttf')

            doc.fontSize(40)
               .fillColor('white')
               .text(name, 100, 295, {
                align: "center"
            })

            doc.end()

            const pdfStream = await getStream.buffer(doc);

            return pdfStream
        }

        catch(e){
            console.log(e);
        }
}

module.exports = getCertificate
