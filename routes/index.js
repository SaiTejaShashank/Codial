const express=require('express');
const router=express.Router();

const homeController=require('../controllers/home_controller');

console.log('router loaded');

router.get('/',homeController.home)
router.get('/feed',homeController.feed)
router.use('/users',require('./users'))
router.use('/posts',require('./posts'))
router.use('/comments',require('./comments'))
router.use('/api',require('./api'))
router.use('/likes',require('./likes'))
module.exports=router;
