const express=require('express');
const router=express.Router();
const passport=require('passport');
const home_controller=require('../controllers/home_controller');
const userrouter=require('./user');
router.get('/',passport.restrictAccess,home_controller.login);
router.get('/signup',passport.restrictAccess,home_controller.signup);
router.post('/signup/adduser',passport.restrictAccess,home_controller.createUser);
router.post('/createsession', passport.authenticate(
    'local',
    {failureMessage: true,failureRedirect: '/',failureFlash:true},
), home_controller.createSession);
router.use('/user',passport.checkAuthentication,userrouter);
module.exports=router;
