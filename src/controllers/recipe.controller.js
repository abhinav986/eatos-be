const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
var mongojs = require('mongojs');
var db_eatos = mongojs('eatos', ['recipes']);


// create Recipe user_id must, rest all are optional
const createRecipe = catchAsync(async (req, res) => {
 if(req.body._id){
  var o_id = new ObjectId(req.body._id);
  req.body._id =o_id;
}
db_eatos.recipes.save(req.body,function(err,response){
  if(err){
    res.status(500).send({
      "status": false,
      "message":"Server error encountered."
    });
  }
  res.status(httpStatus.CREATED).send({
  "status": true,
  "message": 'Recipe Created Successfully!!',
  "data" : response});
});

});

// get all Recipes
const getAllRecipes = catchAsync(async (req, res) => {
  db_eatos.recipes.find({},function(err, result){
    if(err){
      res.status(500).send({
        "status": false,
        "message":"Server error encountered."
      });
    }
    if(result.length>0){
      res.status(200).send( {
        "status": true,
        "message": 'Recipes Data',"data" : result});
    }else{
      res.status(200).send({
        "status": true,
        "message":"No Recipes Data found.",
        "data" : []
      });
    }
  });
});

// get Recipes by user_id, param userId must
const getRecipesByUserId = catchAsync(async (req, res) => {
  db_eatos.recipes.findOne({"user_id": req.params.userId },function(err, result){
    if(err){
      res.status(500).send({
        "status": false,
        "message":"Server error encountered."
      });
    }
    if(result.length>0){

      res.status(200).send( {
        "status": true,
        "message": 'Recipes Data',"data" : result});
    }else{
      res.status(200).send({
        "status": true,
        "message":"No Recipes Data found.",
        "data" : []
      });
    }
  });
});

// get Recipes by recipe id, param recipeId must
const getRecipeByRecipeId = catchAsync(async (req, res) => {
  if(req.params.recipeId ){
    var o_id = new ObjectId(req.params.recipeId);
  }
  db_eatos.recipes.findOne({"_id": o_id},function(err, result){
    if(err){
      res.status(500).send({
        "status": false,
        "message":"Server error encountered."
      });
    }
      res.status(200).send( {
        "status": true,
        "message": 'Recipes Data',"data" : result});

  });
});

// update Recipes, _id is must in body
const updateRecipeByRecipeId = catchAsync(async (req, res) => {
  if(req.body._id){
    var o_id = new ObjectId(req.body._id);
    req.body._id =o_id;
  }
  db_eatos.recipes.save(req.body,function(err,response){
    if(err){
      res.status(500).send({
        "status": false,
        "message":"Server error encountered."
      });
    }else{
      console.log(response)
    res.status(200).send({
      "status": true,
      "message": 'Recipes Updated',
      "data" : response});
    }
  });
});

// delete Recipes by userId
const deleteRecipeByRecipeId = catchAsync(async (req, res) => {
  if(req.params.RecipeId ){
    var o_id = new ObjectId(req.params.recipeId);
  }
  db_eatos.recipes.remove({"_id": o_id },function(err, result){
    if(err){
      res.status(500).send({
        "status": false,
        "message":"Server error encountered."
      });
    }
    if(result){
      res.status(200).send( {
        "status": true,
        "message": 'Recipes Deleted',
        "data" : result});
    }else{
      res.status(200).send({
      "status": true,
      "message":"Not able to delete Recipes.",
      "data" : []
      });
    }
  });
});

const filterRecipe = catchAsync(async (req, res) => {
 let filter = req.body;
 console.log(filter);
  db_eatos.recipes.find(filter ,function(err, result){
    if(err){
      res.status(500).send({
        "status": false,
        "message":"Server error encountered."
      });
    }
    if(result.length>0){

      res.status(200).send( {
        "status": true,
        "message": 'Recipes Data',"data" : result});
    }else{
      res.status(200).send({
        "status": true,
        "message":"No Recipes Data found.",
        "data" : []
      });
    }
  });
});

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipesByUserId,
  getRecipeByRecipeId,
  updateRecipeByRecipeId,
  deleteRecipeByRecipeId,
  filterRecipe
};
