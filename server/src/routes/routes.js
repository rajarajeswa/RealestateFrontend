const{RegisterUser,LoginUser}=require("../controller/authController");
const{AddProperty,ViewProperty,ViewUser}=require("../controller/propertyController");
const{Inquiries,ViewInquiries}=require("../controller/inquires");
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin=require('../middleware/verifyAdmin');

const express=require('express');
const router=express.Router();
router.post('/',RegisterUser);
router.post('/login',LoginUser);
router.post('/admin',AddProperty);
router.get('/view',verifyToken,verifyAdmin,ViewProperty);

router.get('/buy',ViewProperty);
router.post('/buy', Inquiries);
router.get('/inquiries',verifyToken, verifyAdmin,ViewInquiries);
router.get('/users',verifyToken,verifyAdmin, ViewUser);
module.exports = router;





