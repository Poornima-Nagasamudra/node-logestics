const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const orderSchema = new Schema({
    orderNumber: {
        type : Number
    } ,
    itemId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Item' 
    },
    price: {
        type: Number
    },
    customerId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Customer' 
    },
    deliveryVehicleId: { 
        type: Schema.Types.ObjectId, 
        ref: 'DeliveryVehicle' 
    },
    isDelivered: { 
        type: Boolean, 
        default: false 
    }
    // invoiceId: { type: Schema.Types.ObjectId, ref: 'Invoice' }
}, {timestamps: true})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
