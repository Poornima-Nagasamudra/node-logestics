const User = require('../models/user')
const jwt = require('jsonwebtoken')


const authenticateUser = (req, res, next) => {
    let token = req.headers['authorization'].split(' ')[1]
        try{
            let tokenData = jwt.verify(token, 'dct@123')
            User.findById(tokenData._id)
                .then((user) => {
//              console.log(user)
                    req.user = user
                    next()
                })
                .catch((err) => {
                    res.json(err)
                }) 
        } catch(e){
            res.status(400).json(e)
        }
}

const authorizeUser = (req, res, next) => {
    if(req.user.role === 'customer' || req.user.role === 'deliveryVehicle'){
        next()
    } else {
        res.status(403).json({errors: "page doesn't exists"})
    }
}

module.exports = { authenticateUser, authorizeUser }