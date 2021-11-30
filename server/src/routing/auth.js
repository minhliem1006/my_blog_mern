const authController = require('../app/controllers/authController');
const verifyToken = require('../middleware/auth');
const uploadImageUser = require('../middleware/uploadImageUser');
const express = require('express');
const router = express.Router();
// api/auth
router.get('/',verifyToken,authController.check);
router.post('/login', authController.login);
router.post('/register', authController.register);
router.patch('/change-image',uploadImageUser.single('imageUser'),verifyToken,authController.changeImage);
router.patch('/change-password',verifyToken,authController.changePassword);
// router.post('/login', authController.login);
module.exports = router;