const User = require('../models/user')
const bcryptjs  = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {}

userController.register = (req, res) => {
    const body = req.body
    const user = new User(body)
    bcryptjs.genSalt()
       .then((salt) => {
            bcryptjs.hash(user.password, salt)
            .then((encrypted) =>{
                 user.password = encrypted
                 user.save()
                 .then((user) => {
                     const item = new Item({ userId: user._id})
                     item.save()

                    res.json(user)
                 })
                 .catch((err) => {
                    console.log(err)
                    res.status(500).send({ success : false, message: 'error in register'})
                 })
            })
       })
    
}


userController.login = (req, res) => {
    const body = req.body
    User.findOne ({ email : body.email})
       .then((user)=> {
           if(!user){
               res.json({errors: 'invalid email or password'})
           } else {
              bcryptjs.compare(body.password, user.password)
                 .then((match)=> {
                      if(match){
                          const tokenData = {
                             _id: user._id,
                             username: user.username,
                             email: user.email,
                             role: user.role
                          }
                          const token = jwt.sign(tokenData,  'dct@123', {expiresIn : '1d' })
                          res.json({ token : `Bearer ${token}`})
                      } else {
                         res.json({ errors: 'invalid email or password'})
                      }
                 })
           }
           
       })
}

userController.account = (req, res) => {
    res.json(req.user)   
}

userController.list = (req, res) => {
   console.log(req.user)
   User.find()
     .then ((users) => {
        res.json(users)
     })
     .catch((err)=>{
         res.json(err)
     })
}

module.exports = userController