const express = require("express");
const UserController = require("../controller/user_controller")
const router = express.Router();

    router.post('/', UserController.GetAllUser),
    router.post('/randomUserAdded', UserController.RandomUserAdded),
    router.post('/getQueryBasedField', UserController.GetQueryBasedField),
    router.route('/:id').get(UserController.GetParticularUserData).put(UserController.UpdateParticularUserData),

    module.exports = router;