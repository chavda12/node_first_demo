const express = require("express");
const AuthController = require("../controller/auth_controller")

const router = express.Router();

router.post('/signIn', AuthController.UserSignIn),
router.post('/logIn', AuthController.UserLogIn)

module.exports = router;