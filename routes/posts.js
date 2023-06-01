const express=require('express');
const router=express.Router();
const postsController=require("../controllers/posts_controller")
router.get('/create',postsController.create)

module.exports = router;