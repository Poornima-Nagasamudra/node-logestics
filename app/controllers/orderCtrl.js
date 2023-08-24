const Order = require('../models/order')

const orderController = {}

orderController.list = (req, res) => {
    Order.find( { userId: req.user._Id})
       .then((orders) => {
          res.json(orders)
       } )
       .catch((err) => {
          res.json(err)
       })
}

orderController.create = (req, res) => {
    const body = req.body
    console.log(body)
    const order = new Order(body)
    order.userId = req.user._Id
    order.save()
        .then((orders) => {
            res.json(orders)
        })
        .catch((err)=> {
           res.json(err)
        })
}

orderController.show = (req, res) => {
    const id = req.params.id
    Order.findOne ({ _id:id, userId: req.user._Id}) 
        .then((orders) => {
            res.json(orders)
        })
        .catch((err)=> {
           res.json(err)
        })
}

orderController.update =(req, res ) => {
    const id  = req.params.id
    const body = req.body 
    console.log(body)
    Order.findOneAndUpdate( {_id:id, userId: req.user._Id }, body, {new:true, runValidators:true})
    .then((orders) => {
        res.json(orders)
    })
    .catch((err)=> {
       res.json(err)
    })
}

orderController.destroy = (req, res) => {
    const id = req.params.id
    console.log('de',id) 
    Order.findOneAndDelete({_id: id, userId:req.user._Id})
    .then((orders) => {
        res.json(orders)
    })
    .catch((err)=> {
       res.json(err)
    })
}

module.exports = orderController