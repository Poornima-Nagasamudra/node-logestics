const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const customerSchema = new Schema({
    name :{
        type: String,
        required: [true, 'name is required']
    },
    city : {
        type: String,
        required: [true, 'city is required']
    }
}, {timestamps: true})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer
