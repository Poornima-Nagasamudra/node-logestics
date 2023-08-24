const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const itemSchema = new Schema({
    name :{
        type: String,
        required: [true, 'name is required']
    },
    price : {
        type: String,
        required: [true, 'price is required']
    }
}, {timestamps: true})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
