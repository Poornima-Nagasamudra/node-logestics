const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/userCtrl')
const {authenticateUser, authorizeUser} = require('../app/middlewares/authenticateUser')
const itemController = require('../app/controllers/itemCtrl')
const customerController = require('../app/controllers/customerCtrl')
const deliveryVehicleController = require('../app/controllers/vehicleDeliveryCtrl')
const orderController = require('../app/controllers/orderCtrl')

//user
router.post('/api/register', userController.register)
router.post('/api/login', userController.login)
router.get('/api/account', authenticateUser, userController.account)

router.get('/api/users', authenticateUser, authorizeUser,  userController.list )


//item
router.get('/items', authenticateUser, itemController.list)
router.post('/items', authenticateUser, itemController.create)
router.get('/items/:id', authenticateUser, itemController.show)
router.put('/items/:id', authenticateUser, itemController.update)
router.delete('/items/:id', authenticateUser, itemController.destroy)

//customer
router.get('/customers', authenticateUser, customerController.list)
router.post('/customers', authenticateUser, customerController.create)
router.get('/customers/:id', authenticateUser, customerController.show)
router.put('/customers/:id', authenticateUser, customerController.update)
router.delete('/customers/:id', authenticateUser, customerController.destroy)

//deliveryVehicle
router.get('/deliveryVehicle', authenticateUser, deliveryVehicleController.list)
router.post('/deliveryVehicle', authenticateUser, deliveryVehicleController.create)
router.get('/deliveryVehicle/:id', authenticateUser, deliveryVehicleController.show)
router.put('/deliveryVehicle/:id', authenticateUser, deliveryVehicleController.update)
router.delete('/deliveryVehicle/:id', authenticateUser, deliveryVehicleController.destroy)

// // order
// router.get('/orders', authenticateUser, orderController.list)
// router.post('/orders', authenticateUser, orderController.create)
// router.get('/orders/:id', authenticateUser, orderController.show)
// router.put('/orders/:id', authenticateUser, orderController.update)
// router.delete('/orders/:id', authenticateUser, orderController.destroy)

module.exports = router