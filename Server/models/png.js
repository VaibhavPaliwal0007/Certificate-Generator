const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
         type: String,
        //  required: true,
         trim: true,
        //  unique: true
    },
    
    certificate: {
        type: Buffer,
        required: true,
    }
}, { timestamps: true })

const png = mongoose.model('png', userSchema)

module.exports = png