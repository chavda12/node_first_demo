const express = require("express");
const UserController = require("../controller/user_controller")
const router = express.Router();
router.get('/', UserController.GetUser),
router.post('/signin', UserController.UserSignIn),
router.post('/login', UserController.UserLogIn),
router.post('/randomUserAdded', UserController.RandomUserAdded),
router.post('/getQueryBasedField', UserController.GetQueryBasedField),
router.get('/:id', UserController.GetParticularUserData),

module.exports = router;