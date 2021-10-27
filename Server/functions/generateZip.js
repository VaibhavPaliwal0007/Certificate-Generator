const JSzip = require('jszip')
const fs = require('fs')
const getCertificate = require('./getCetificate')

const generateZipforCertificate = async(file, bufferStream) =>{
      
    try{
        const zip = new JSzip()

        for(let idx = 0; idx < file.Strings.length; idx++)
        {
            for(obj in file.Strings[idx])
            {
                if(obj == "h" && file.Strings[idx][obj] != undefined){
                    var name = file.Strings[idx][obj]
                    
                    bufferStream = await getCertificate(name)
                    zip.file( `${name}.pdf`, bufferStream)
                }
            }
        }

        let buffer = await zip.generateAsync({ type: "base64", compression: 'DEFLATE' })

        let Zip = Buffer.from(buffer, "base64")

        return Zip

        // fs.writeFile('./upload/test.zip', buffer, (error) => {
        //     if(error){
        //         console.log(error)
        //     }
        //     else{
        //         console.log('File written successfully');
        //     }
        // })
    }

    catch(e){
        console.log(e)
    }
}

module.exports = generateZipforCertificate