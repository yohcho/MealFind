const mongoose = require('mongoose')

const Subscriptions = new mongoose.Schema({
    email: {type:String},
    foodItemName: {type:String}
})

module.exports = mongoose.model('Subscriptions',Subscriptions)