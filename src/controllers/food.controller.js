const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
var mongojs = require('mongojs');
var db_eatos = mongojs('eatos', ['recipes']);




// get all food types
const getFoodType = catchAsync(async (req, res) => {
  db_eatos.food_time.find({},function(err, result){
    if(err){
      res.status(500).send({
        "status": false,
        "message":"Server error encountered."
      });
    }
    if(result.length>0){
      res.status(200).send( {
        "status": true,
        "message": 'Food Time Data',"data" : result});
    }else{
      res.status(200).send({
        "status": true,
        "message":"No Food Time Data found.",
        "data" : []
      });
    }
  });
});

// get all food course
const getFoodCourse = catchAsync(async (req, res) => {
  db_eatos.food_course.find({},function(err, result){
    if(err){
      res.status(500).send({
        "status": false,
        "message":"Server error encountered."
      });
    }
    if(result.length>0){
      res.status(200).send( {
        "status": true,
        "message": 'Food Course Data',"data" : result});
    }else{
      res.status(200).send({
        "status": true,
        "message":"No Food Course Data found.",
        "data" : []
      });
    }
  });
});

// get all food cusine
const getFoodCusine = catchAsync(async (req, res) => {
  db_eatos.food_cusine.find({},function(err, result){
    if(err){
      res.status(500).send({
        "status": false,
        "message":"Server error encountered."
      });
    }
    if(result.length>0){
      res.status(200).send( {
        "status": true,
        "message": 'Food Cusines Data',"data" : result});
    }else{
      res.status(200).send({
        "status": true,
        "message":"No Food Cusines Data found.",
        "data" : []
      });
    }
  });
});

// get all food cusine
const getFoodResturantType = catchAsync(async (req, res) => {
  db_eatos.food_resturant_types.find({},function(err, result){
    if(err){
      res.status(500).send({
        "status": false,
        "message":"Server error encountered."
      });
    }
    if(result.length>0){
      res.status(200).send( {
        "status": true,
        "message": 'Food Resturant Type Data',"data" : result});
    }else{
      res.status(200).send({
        "status": true,
        "message":"No Food Resturant Type Data found.",
        "data" : []
      });
    }
  });
});




module.exports = {
  getFoodType,
  getFoodCourse,
  getFoodCusine,
  getFoodResturantType
};
