const express = require("express");
const UserController = require("../controller/user_controller")

const router = express.Router();
router.get('/', UserController.GetUser),
router.post('/formData', UserController.GetUserUsingFormData)


module.exports = router;