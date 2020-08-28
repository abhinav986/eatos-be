const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

var ObjectId = require('mongodb').ObjectId;
var MongoClient = require('mongodb').MongoClient;
var mongojs = require('mongojs');
var db_eatos = mongojs('eatos', ['blogs']);


// create blog user_id must, rest all are optional
const createBlog = catchAsync(async (req, res) => {
 if(req.body._id){
  var o_id = new ObjectId(req.body._id);
  req.body._id =o_id;
}
db_eatos.blogs.save(req.body,function(err,response){
  if(err){
    res.status(500).send({
      "status": false,
      "message":"Server error encountered."
    });
  }
  res.status(httpStatus.CREATED).send({
  "status": true,
  "message": 'Blog Created Successfully!!',
  "data" : response});
});

});

// get all blogs
const getAllBlogs = catchAsync(async (req, res) => {
  db_eatos.blogs.find({},function(err, result){
    if(err){
      res.status(500).send({
        "status": false,
        "message":"Server error encountered."
      });
    }
    if(result.length>0){
      res.status(200).send( {
        "status": true,
        "message": 'Blogs Data',"data" : result});
    }else{
      res.status(200).send({
        "status": true,
        "message":"No Blogs Data found.",
        "data" : []
      });
    }
  });
});

// get Blogs by user_id, param userId must
const getBlogsByUserId = catchAsync(async (req, res) => {
  db_eatos.blogs.find({"user_id": req.params.userId },function(err, result){
    if(err){
      res.status(500).send({
        "status": false,
        "message":"Server error encountered."
      });
    }
    if(result.length>0){

      res.status(200).send( {
        "status": true,
        "message": 'Blogs Data',"data" : result});
    }else{
      res.status(200).send({
        "status": true,
        "message":"No Blogs Data found.",
        "data" : []
      });
    }
  });
});

// get Blogs by _id, param blogId must
const getBlogByBlogId = catchAsync(async (req, res) => {
  if(req.params.blogId ){
    var o_id = new ObjectId(req.params.blogId);
  }
  db_eatos.blogs.findOne({"_id": o_id},function(err, result){
    if(err){
      res.status(500).send({
        "status": false,
        "message":"Server error encountered."
      });
    }

      res.status(200).send( {
        "status": true,
        "message": 'Blogs Data',"data" : result});

  });
});

// update Blogs, _id is must in body
const updateBlogByBlogId = catchAsync(async (req, res) => {
  if(req.body._id){
    var o_id = new ObjectId(req.body._id);
    req.body._id =o_id;
  }
  db_eatos.blogs.save(req.body,function(err,response){
    if(err){
      res.status(500).send({
        "status": false,
        "message":"Server error encountered."
      });
    }else{
      console.log(response)
    res.status(200).send({
      "status": true,
      "message": 'Blogs Updated',
      "data" : response});
    }
  });
});

// delete Blogs by userId
const deleteBlogByBlogId = catchAsync(async (req, res) => {
  if(req.params.blogId ){
    var o_id = new ObjectId(req.params.blogId);
  }
  db_eatos.blogs.remove({"_id": o_id },function(err, result){
    if(err){
      res.status(500).send({
        "status": false,
        "message":"Server error encountered."
      });
    }
    if(result){
      res.status(200).send( {
        "status": true,
        "message": 'Blogs Deleted',
        "data" : result});
    }else{
      res.status(200).send({
      "status": true,
      "message":"Not able to delete Blogs.",
      "data" : []
      });
    }
  });
});

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogsByUserId,
  getBlogByBlogId,
  updateBlogByBlogId,
  deleteBlogByBlogId,
};
