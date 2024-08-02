const User = require("../model/user_model");
const ResponseHandler = require('../response_handler');
const CommonError = require('../error');
const RestAPI = require("../axios");
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
            return ResponseHandler.error(res, `Missing required field: ${missingFieldList.join(', ')}`, CommonError.Bad_Request);

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
        ResponseHandler.error(res);
    }
}

const UserLogIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const plainTextPassword = password;
        // const isMatch = await bcrypt.compare(plainTextPassword,);

        if (!email && !password) return ResponseHandler.error(res, `Missing required field: email , password`, CommonError.Bad_Request);
        else if (!email) return ResponseHandler.error(res, `Missing required field: email`, CommonError.Bad_Request);
        else if (!password) return ResponseHandler.error(res, `Missing required field: password`, CommonError.Bad_Request);
        const user = await User.findOne({ email });
        if (!user) {
            return ResponseHandler.error(res, "Invalid Credentials", CommonError.Bad_Request);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return ResponseHandler.error(res, "Invalid Credentials", CommonError.Bad_Request);
        }

        console.log(user.toObject());
        return ResponseHandler.success(res, user);
    } catch (error) {
        console.log(error);
        ResponseHandler.error(res);
    }
}

module.exports = { UserSignIn, UserLogIn }