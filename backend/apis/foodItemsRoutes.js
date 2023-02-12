const express = require('express')
const router  = express.Router()

const foodItemsController = require('../controllers/foodItemsController')

router.get('/getData', foodItemsController.getData)

module.exports = router