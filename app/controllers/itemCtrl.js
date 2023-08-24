const Item = require('../models/item')

const itemController = {}

itemController.list = (req, res) => {
    Item.find( { userId: req.user._Id})
       .then((items) => {
          res.json(items)
       } )
       .catch((err) => {
          res.json(err)
       })
}

itemController.create = (req, res) => {
    const body = req.body
    console.log(body)
    const item = new Item(body)
    item.userId = req.user._Id
    item.save()
        .then((items) => {
            res.json(items)
        })
        .catch((err)=> {
           res.json(err)
        })
}

itemController.show = (req, res) => {
    const id = req.params.id
    console.log(id)
    Item.findOne( {_id:id, userId:req.user._Id})
       .then((items) => {
        console.log(items)
          res.json(items)
       })
       .catch((err) => {
          res.json(err)
       })
}

itemController.update =(req, res ) => {
    const id  = req.params.id
    const body = req.body 
    console.log(body)
    Item.findOneAndUpdate( {_id:id, userId: req.user._Id }, body, {new:true, runValidators:true})
    .then((items) => {
        res.json(items)
    })
    .catch((err)=> {
       res.json(err)
    })
}

itemController.destroy = (req, res) => {
    const id = req.params.id
    console.log('de',id) 
    Item.findOneAndDelete({_id: id, userId:req.user._Id})
    .then((items) => {
        res.json(items)
    })
    .catch((err)=> {
       res.json(err)
    })
}

module.exports = itemController