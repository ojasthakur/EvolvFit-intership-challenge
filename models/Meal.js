const mongoose = require('mongoose')
const singleFoodItem = require('./FoodItem')

// eventsAttended: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
const MealSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide a Meal name']
    },
    category:{
        type: String,
        enum: ['Breakfast', 'Lunch', 'Evening Snack', 'Dinner'],
        required: [true, 'Please provide a meal type']
    },
    foodItems: [{type: mongoose.Types.ObjectId, ref: 'FoodItem'}]
})

module.exports = mongoose.model('Meal', MealSchema)