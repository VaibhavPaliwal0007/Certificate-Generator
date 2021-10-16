const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
         type: String,
         required: true,
         trim: true
    },
    
    certificate: {
        type: Buffer,
        required: true,
    }
}, { timestamps: true })

const PNG = mongoose.model('PNG', userSchema)

module.exports = PNG