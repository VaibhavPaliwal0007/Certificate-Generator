const PDFDocument = require('pdfkit')
const fs = require('fs')
const getStream = require('get-stream')

const getCertificate = async (img, name, res) =>{
        try{
            const doc = new PDFDocument({
                layout: "landscape",
                size: "A4",
            })

            // doc.pipe(fs.createWriteStream(`${__dirname}/../upload/${name}.pdf`));
            doc.pipe(res)

            doc.image(img, 0, 0, { width: 900 })
            console.log(process.cwd())

            doc.font(process.cwd() + '/fonts/DancingScript-VariableFont_wght.ttf')

            doc.fontSize(40)
               .fillColor('white')
               .text(name, 100, 295, {
                align: "center"
            })

            doc.end()

            const pdfStream = await getStream.buffer(doc);
            return pdfStream;
        }

        catch(e){
            console.log(e);
        }
}

module.exports = getCertificate
