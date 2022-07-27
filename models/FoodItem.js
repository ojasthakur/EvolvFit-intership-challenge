const mongoose = require('mongoose')

const FoodItemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide food item name'],
        trim: true, 
        unique: true,
        maxlength: [100, 'Name cannot be more than 100 characters']
    },
    calories: {
        type: Number,
        required: [true, 'Please provide the amount of calories']
    },
    protein:{
        type: Number,
        required: [true, 'Please provide the amount of protein content'],
        default: 0
    },
    carbs:{
        type: Number,
        required: [true, 'Please provide the amount of carbs contained']
    },
    fat:{
        type: Number, 
        required: [true, 'Please provide the amount of fat content']
    },
    acceptedUnits:{
        type: String,
        // required: [true, 'Please provide the measurement units to be used'],
        enum: ['ml','litre','g', 'kg', 'item']
    },
    itemWeight:{
        type: Number,
        // required: [true, 'Please provide the item weight in grams']
    }
})

module.exports = mongoose.model('FoodItem', FoodItemSchema )