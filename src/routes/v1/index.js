const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const userProfileRoute = require('./user-profile.route');
const blogRoute = require('./blog.route');
const recipeRoute = require('./recipe.route');
const foodRoute = require('./food.route');
const uploadRoute = require('./upload.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/docs', docsRoute);
router.use('/user-profile', userProfileRoute);
router.use('/blog', blogRoute);
router.use('/recipe', recipeRoute);
router.use('/food', foodRoute);
router.use('/upload', uploadRoute);

module.exports = router;
