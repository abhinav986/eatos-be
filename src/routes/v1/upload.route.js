const express = require('express');
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
var multer = require('multer');
const uploadController = require('../../controllers/upload.controller');
const path = require('path')

const router = express.Router();
var storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, '../../../uploads/')
  },
  filename: (req, file, cb) => {

   console.log(file.originalname);
  let filename = file.originalname;
  let extArray = file.mimetype.split("/");
  let extension = extArray[extArray.length - 1];
  cb(null, file.fieldname + '-' + Date.now()+ extension)
  }
});
var upload = multer({storage: storage});


router
  .route('/')
  .post( upload.single('file'), uploadController.uploadFile)

  router
  .route('/:image')
  .get((req, res) => {
    let reqPath = path.join(__dirname, '../../../uploads/');
    let image = req.params.image;
    res.sendFile(reqPath + image);
  });

module.exports = router;

