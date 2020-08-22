const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

// var ObjectId = require('mongodb').ObjectId;
// var MongoClient = require('mongodb').MongoClient;
// var mongojs = require('mongojs');
// var db_eatos = mongojs('eatos', ['blogs']);


// upload file
const uploadFile = catchAsync(async (req, res) => {
  res.json({'message': 'File uploaded successfully',
   'path': 'uploads/' + req.file.filename, 'status': 1});
});



module.exports = {
  uploadFile,
};
