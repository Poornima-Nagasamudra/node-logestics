const Customer = require('../models/customer')

const customerController = {}

customerController.list = (req, res) => {
    Customer.find( { userId: req.user._Id})
       .then((items) => {
          res.json(items)
       } )
       .catch((err) => {
          res.json(err)
       })
}

customerController.create = (req, res) => {
    const body = req.body
    console.log(body)
    const customer = new Customer(body)
    customer.userId = req.user._Id
    customer.save()
        .then((customers) => {
            res.json(customers)
        })
        .catch((err)=> {
           res.json(err)
        })
}

customerController.show = (req, res) => {
    const id = req.params.id
    Customer.findOne ({ _id:id, userId: req.user._Id}) 
        .then((customers) => {
            res.json(customers)
        })
        .catch((err)=> {
           res.json(err)
        })
}

customerController.update =(req, res ) => {
    const id  = req.params.id
    const body = req.body 
    console.log(body)
    Customer.findOneAndUpdate( {_id:id, userId: req.user._Id }, body, {new:true, runValidators:true})
    .then((customers) => {
        res.json(customers)
    })
    .catch((err)=> {
       res.json(err)
    })
}

customerController.destroy = (req, res) => {
    const id = req.params.id
    console.log('de',id) 
    Customer.findOneAndDelete({_id: id, userId:req.user._Id})
    .then((customers) => {
        res.json(customers)
    })
    .catch((err)=> {
       res.json(err)
    })
}

module.exports = customerController