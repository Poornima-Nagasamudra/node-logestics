const mongoose = require('mongoose')
const isEmail = require( 'validator/lib/isEmail')

const Schema = mongoose.Schema 

const userSchema = new Schema({
      username : {
        type: String,
        required:[true, 'username required'],
        minlength: 3,
        maxlength: 20
      },
      email : {
        type: String,
        required: true,
        validate : {
            validator : function(value){
                return isEmail(value)
            },
            message : function(){
                return 'invalid email'
            }
        }
      },
      password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 150
      }
}, {timestamps:true} )

const User = mongoose.model('User', userSchema)

module.exports = User