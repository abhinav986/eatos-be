const express = require('express');
const recipeController = require('../../controllers/food.controller');

const router = express.Router();

router
  .route('/type')
  .get(  recipeController.getFoodType);


router
  .route('/course')
  .get(  recipeController.getFoodCourse);

  router
  .route('/cusine')
  .get( recipeController.getFoodCusine)

  router
  .route('/resturant-type')
  .get( recipeController.getFoodResturantType)



module.exports = router;

