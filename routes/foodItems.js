const express = require('express')

const router = express.Router();

const {getAllFoodItems, createFoodItem, getSingleFoodItem, updateFoodItem, deleteFoodItem} = require('../controllers/foodItems')

router.route('/').get(getAllFoodItems).post(createFoodItem)
router.route('/:id').get(getSingleFoodItem).patch(updateFoodItem).delete(deleteFoodItem)

module.exports = router