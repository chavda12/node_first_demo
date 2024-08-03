const User = require("../model/user_model");
const ResponseHandler = require('../utils/response_handler');
const CommonError = require('../utils/error');
const RestAPI = require("../utils/axios");
const bcrypt = require('bcrypt');



const UserSignIn = async (req, res) => {
    try {

        const data = req.body;
        var missingFieldList = [];

        const requiredFields = ['name', 'email', 'password'];
        for (var i = 0; i < requiredFields.length; i++) {
            if (!data[requiredFields[i]]) {
                missingFieldList.push(requiredFields[i]);
                continue;
            }
        }

        if (missingFieldList.length > 0)
            return ResponseHandler.error(res, `Missing required field: ${missingFieldList.join(', ')}`, CommonError.Bad_Request, `Missing required field: ${missingFieldList.join(', ')}`);

        const password = await bcrypt.hash(data.password, 10); // 10 is the salt rounds

        const newUser = await User({
            name: data.name, email: data.email, password: password, phoneNumber: data.phoneNumber
        });
        await newUser.save().then(() => {
            console.log('user created');
        }).catch((error) => {
            console.error("error creating user:", error);
        });
        return ResponseHandler.success(res, newUser);

    } catch (error) {
        ResponseHandler.error({ res, errorMessage: error });
    }
}

const UserLogIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) return ResponseHandler.error({res,message: `Missing required field: email , password`,status: CommonError.Bad_Request,errorMessage:`Missing required field: email , password`});
        else if (!email) return ResponseHandler.error({res,message: `Missing required field: email`,status: CommonError.Bad_Request,errorMessage:`Missing required field: email`});
        else if (!password) return ResponseHandler.error({res,message: `Missing required field: password`,status: CommonError.Bad_Request,errorMessage:`Missing required field: password`});
        const user = await User.findOne({ email });
        if (!user) {
            return ResponseHandler.error({res,message: "Invalid Credentials",status: CommonError.Bad_Request,errorMessage:"Invalid Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return ResponseHandler.error({res,message: "Invalid Credentials",status: CommonError.Bad_Request,errorMessage:"Invalid Credentials"});
        }

        console.log(user.toObject());
        return ResponseHandler.success(res, user);
    } catch (error) {
        ResponseHandler.error({res,errorMessage:error});
    }
}

module.exports = { UserSignIn, UserLogIn }