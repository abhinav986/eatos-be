const express = require('express');
const auth = require('../../middlewares/auth');
const recipeController = require('../../controllers/recipe.controller');

const router = express.Router();

router
  .route('/')
  .post( recipeController.createRecipe)
  .get(  recipeController.getAllRecipes);

router
  .route('/:recipeId')
  .get(  recipeController.getRecipeByRecipeId)
  .put(  recipeController.updateRecipeByRecipeId)
  .delete(  recipeController.deleteRecipeByRecipeId);

router
  .route('user/:userId')
  .get(  recipeController.getRecipesByUserId);

  router
  .route('/filter')
  .post( recipeController.filterRecipe)



module.exports = router;

