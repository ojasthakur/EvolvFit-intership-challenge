const {StatusCodes} = require('http-status-codes')

const CustomError = require('../errors')

const Meal = require('../models/Meal')

const createMeal = async (req, res)=>{
    const { name } = req.body;
    console.log(req.body)
    const nameAlreadyExists = await Meal.findOne({ name });
    console.log(name)
    if (nameAlreadyExists) {
        throw new CustomError.BadRequestError('Name already exists');
    }

    console.log(req.body)

    const meal = await Meal.create(req.body);
    console.log(meal)
    res.status(StatusCodes.CREATED).json({msg:"meal created", details: meal})
}

const getAllMeals = async(req, res)=>{
    const meals = await Meal.find({}).populate('foodItems')
    console.log(meals)
    res.send({count: meals.length, meals: meals})

}

const getSingleMeal = async(req, res)=>{
    const { id: mealId } = req.params;
    
    const meal = await Meal.findOne({_id: mealId}).populate('foodItems');
    if (!meal) {
        throw new CustomError.NotFoundError(`No meal with id : ${mealId}`);
      }
      res.status(StatusCodes.OK).json({ meal })
}

const updateMeal = async(req, res)=>{
    const { id: mealId } = req.params;

  const meal = await Meal.findOneAndUpdate({ _id: mealId }, req.body, {
    // option new: true returns the updated document instead of the original
    new: true,
    runValidators: true,
  });
//   console.log(req.body)
//   console.log(meal)
  if (!meal) {
    throw new CustomError.NotFoundError(`No meal with id : ${mealId}`);
  }
  res.status(StatusCodes.OK).json({"Updated Meal": meal });
}

const deleteMeal = async(req, res)=>{
    const {id: mealId} = req.params;
    
    const meal = await Meal.findOne({ _id: mealId });
  
    if (!meal) {
      throw new CustomError.NotFoundError(`No meal with id : ${mealId}`);
    }
  
    meal.remove();
    res.status(StatusCodes.OK).json({ msg: 'success! meal removed' });
}
// const allMealIds = async(req, res)=>{
//     const allMealIds = await Meal.find({}).select({_id})
//     res.status(StatusCodes.OK).json({count: allMealIds.length, allMealIds: allMealIds})
// }
module.exports = {createMeal, getAllMeals, getSingleMeal, updateMeal, deleteMeal}