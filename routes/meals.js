const express = require('express')

const router = express.Router();


const {getAllMeals, createMeal, getSingleMeal, updateMeal, deleteMeal} = require('../controllers/meals.js')

router.route('/').get(getAllMeals).post(createMeal)    
router.route('/:id').get(getSingleMeal).patch(updateMeal).delete(deleteMeal)

module.exports = router