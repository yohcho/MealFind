const mongoose = require('mongoose')

const FoodItems = new mongoose.Schema({
    name: {type:String},
    availability: [{
        location: {type:String},
        date: {type:Date},
        course: {type:String}
    }],
    queryCount: {type:Number, default:0},
    subsCount: {type:Number, default:0}
})

module.exports = mongoose.model('FoodItems',FoodItems)