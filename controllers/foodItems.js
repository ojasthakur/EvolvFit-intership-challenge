// const express = require('express')
const {StatusCodes} = require('http-status-codes')

//CustomError contains all the exports of the error folder
const CustomError = require('../errors')

const FoodItem = require('../models/FoodItem')

const createFoodItem = async(req, res)=>{

    const { name } = req.body;

    const nameAlreadyExists = await FoodItem.findOne({ name });
    console.log(name)
    if (nameAlreadyExists) {
        throw new CustomError.BadRequestError('Name already exists');
    }

    console.log(req.body)

    const foodItem = await FoodItem.create(req.body);
    res.status(StatusCodes.CREATED).json({msg:"food item created", details: foodItem})
}

const getAllFoodItems = async(req, res)=>{
    const foodItems = await FoodItem.find({})
    console.log(foodItems)

    if(!foodItems){
        throw new CustomError.BadRequestError('No food items found')
    }

    res.status(StatusCodes.OK).json({count: foodItems.length ,foodItems })
}


const getSingleFoodItem = async (req, res) => {
    const { id: foodItemId } = req.params;
    const foodItem = await FoodItem.findOne({ _id: foodItemId })
    if (!foodItem) {
      throw new CustomError.NotFoundError(`No foodItem with id : ${foodItemId}`);
    }
    res.status(StatusCodes.OK).json({ foodItem });
  };

const updateFoodItem = async (req, res) => {
  const { id: foodItemId } = req.params;

  const foodItem = await FoodItem.findOneAndUpdate({ _id: foodItemId }, req.body, {
    // option new: true returns the updated document instead of the original
    new: true,
    runValidators: true,
  });
  console.log(req.body)
  console.log(foodItem)
  if (!foodItem) {
    throw new CustomError.NotFoundError(`No FoodItem with id : ${foodItemId}`);
  }
  res.status(StatusCodes.OK).json({ foodItem });
};  

const deleteFoodItem = async (req, res) => {
    const { id: foodItemId } = req.params;
  
    const foodItem = await FoodItem.findOne({ _id: foodItemId });
  
    if (!foodItem) {
      throw new CustomError.NotFoundError(`No FoodItem with id : ${foodItemId}`);
    }
  
    foodItem.remove();
    res.status(StatusCodes.OK).json({ msg: 'success! FoodItem removed' });
  };
module.exports = {getAllFoodItems, createFoodItem, getSingleFoodItem, updateFoodItem, deleteFoodItem}