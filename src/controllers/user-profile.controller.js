const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
var mongojs = require('mongojs');
var db_eatos = mongojs('eatos', ['user_profile']);


// create user profile user_id must, rest all are optional
const createUserProfile = catchAsync(async (req, res) => {
 if(req.body._id){
  var o_id = new ObjectId(req.body._id);
  req.body._id =o_id;
}
db_eatos.user_profile.save(req.body,function(err,response){
  if(err){
    res.status(500).send({
      "status": false,
      "message":"Server error encountered."
    });
  }
  res.status(httpStatus.CREATED).send({
  "status": true,
  "message": 'User Profile Created',
  "data" : response});
});

});

// get all users profile
const getUsersProfile = catchAsync(async (req, res) => {
  db_eatos.user_profile.find({},function(err, result){
    if(err){
      res.status(500).send({
        "status": false,
        "message":"Server error encountered."
      });
    }
    if(result){
      res.status(200).send( {
        "status": true,
        "message": 'User Profile Data',"data" : result});
    }else{
      res.status(200).send({
        "status": true,
        "message":"No User Profile Data found.",
        "data" : []
      });
    }
  });
});

// get user profile bt user_id, param userId must
const getUserProfile = catchAsync(async (req, res) => {
  db_eatos.user_profile.findOne({"user_id": req.params.userId },function(err, result){
    if(err){
      res.status(500).send({
        "status": false,
        "message":"Server error encountered."
      });
    }
    if(result){

      res.status(200).send( {
        "status": true,
        "message": 'User Profile Data',"data" : result});
    }else{
      res.status(200).send({
        "status": true,
        "message":"No User Profile Data found.",
        "data" : []
      });
    }
  });
});

// update user profile, _id is must in body
const updateUserProfile = catchAsync(async (req, res) => {
  if(req.body._id){
    var o_id = new ObjectId(req.body._id);
    req.body._id =o_id;
  }
  db_eatos.user_profile.save(req.body,function(err,response){
    if(err){
      res.status(500).send({
        "status": false,
        "message":"Server error encountered."
      });
    }else{
      console.log(response)
    res.status(200).send({
      "status": true,
      "message": 'User Profile Updated',
      "data" : response});
    }
  });
});

// delete user profile by userId
const deleteUserProfile = catchAsync(async (req, res) => {
  db_eatos.user_profile.remove({"user_id": req.params.userId },function(err, result){
    if(err){
      res.status(500).send({
        "status": false,
        "message":"Server error encountered."
      });
    }
    if(result){
      res.status(200).send( {
        "status": true,
        "message": 'User Profile Deleted',
        "data" : result});
    }else{
      res.status(200).send({
      "status": true,
      "message":"Not able to delete user profile.",
      "data" : []
      });
    }
  });
});

module.exports = {
  createUserProfile,
  getUsersProfile,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
