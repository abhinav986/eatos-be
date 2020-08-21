const express = require('express');
const auth = require('../../middlewares/auth');
const userProfileController = require('../../controllers/user-profile.controller');

const router = express.Router();

router
  .route('/')
  .post( userProfileController.createUserProfile)
  .get(  userProfileController.getUsersProfile);

router
  .route('/:userId')
  .get(  userProfileController.getUserProfile)
  .put(  userProfileController.updateUserProfile)
  .delete(  userProfileController.deleteUserProfile);

module.exports = router;

