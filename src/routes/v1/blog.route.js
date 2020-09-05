const express = require('express');
const auth = require('../../middlewares/auth');
const blogController = require('../../controllers/blog.controller');

const router = express.Router();

router
  .route('/')
  .post( blogController.createBlog)
  .get(  blogController.getAllBlogs);

router
  .route('/:blogId')
  .get(  blogController.getBlogByBlogId)
  .put(  blogController.updateBlogByBlogId)
  .delete(  blogController.deleteBlogByBlogId);

router
  .route('/user/:userId')
  .get(  blogController.getBlogsByUserId);



module.exports = router;

