const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const deliveryVehicleSchema = new Schema({
    registrationNumber : {
        type: String,
        required: [true, 'registration number is required'],
        unique: true
    },
    vehicleType: {
        type : String,
        required: [true, 'vehicleType is required'],
        enum : ['bike', 'truck']
    },
    city : {
        type :String,
        required: [true, 'city is required']
    }, 
    activeOrdersCount : {
        type :String,
        default : 0,
        maxlength : 2
    }


}, {timestamps: true})

const DeliveryVehicle = mongoose.model('DeliveryVehicle', deliveryVehicleSchema)

module.exports = DeliveryVehicle
