const DeliveryVehicle = require('../models/deliveryVehicle')

const deliveryVehicleController = {}

deliveryVehicleController.list = (req, res) => {
    if(req.user.role === 'customer'){
        DeliveryVehicle.find()
            .then((vehicles) => {
                res.json(vehicles)
            })
            .catch((err) => {
                res.json(err)
            })
    }  else{
        DeliveryVehicle.find({userId: req.user._Id})
            .then((vehicles) => {
                res.json(vehicles)
            })
            .catch((err) => {
                res.json(err)
            })
    } 
}

deliveryVehicleController.create = (req, res) => {
    const body = req.body
    console.log(body)
    const deliveryVehicle = new DeliveryVehicle(body)
    deliveryVehicle.userId = req.user._Id
    deliveryVehicle.save()
        .then((vehicles) => {
            res.json(vehicles)
        })
        .catch((err)=> {
           res.json(err)
        })
}

deliveryVehicleController.show = (req, res) => {
    const id = req.params.id
    DeliveryVehicle.findOne ({ _id:id, userId: req.user._Id}) 
        .then((vehicles) => {
            res.json(vehicles)
        })
        .catch((err)=> {
           res.json(err)
        })
}

deliveryVehicleController.update =(req, res ) => {
    const id  = req.params.id
    const body = req.body 
    console.log(body)
    DeliveryVehicle.findOneAndUpdate( {_id:id, userId: req.user._Id }, body, {new:true, runValidators:true})
    .then((vehicles) => {
        res.json(vehicles)
    })
    .catch((err)=> {
       res.json(err)
    })
}

deliveryVehicleController.destroy = (req, res) => {
    const id  = req.params.id 
    if(req.user.role === 'customer'){
        DeliveryVehicle.findByIdAndDelete(id)
          .then((vehicles) => {
              res.json(vehicles)
           })
           .catch((err) => {
              res.json(err)
           })
      
    } else {
        DeliveryVehicle.findOneAndDelete({ _id: id, userId:req.user._Id})
          .then((vehicles) => {
              res.json(vehicles)
          })
          .catch((err) => {
              res.json(err)
          })
    }
}

module.exports = deliveryVehicleController