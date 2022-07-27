const mongoose = require('mongoose')
// const singleFoodItem = require('./FoodItem')

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide a User name'],
        trim: true, 
        unique: true,
        maxlength: [30, 'Name cannot be more than 30 characters']
    },
    calorieRequirement:{
        type: Number,
        required: [true, 'Please provide calorie requirement']
    },
    mealPlan:{ 
       type:  [
                {
                    date: Date,
                    meals: [{type: mongoose.Types.ObjectId, ref: 'Meal'}]
                }
            ]
        }
        
})

module.exports = mongoose.model('User', UserSchema)