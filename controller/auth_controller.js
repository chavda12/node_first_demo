const User = require("../model/user_model");
const SuccessHandler = require('../response_handler');
const CommonError = require('../error');
const RestAPI = require("../axios");


const UserSignIn = (req, res) => {
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
            return SuccessHandler.error(res, `Missing required field: ${missingFieldList.join(', ')}`, CommonError.Bad_Request);

        const newUser = User({ name: data.name, email: data.email, password: data.password });
        newUser.save().then(() => {
            console.log('user created');
        }).catch((error) => {
            console.error("error creating user:", error);
        });
        return SuccessHandler.success(res, CommonError.Success);

    } catch (error) {
        SuccessHandler.error(res);
    }
}

const UserLogIn =async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) return SuccessHandler.error(res, `Missing required field: email , password`, CommonError.Bad_Request);
        else if (!email) return SuccessHandler.error(res, `Missing required field: email`, CommonError.Bad_Request);
        else if (!password) return SuccessHandler.error(res, `Missing required field: password`, CommonError.Bad_Request);
        const user =await User.findOne({ email, password });
        if(user == null){
            return SuccessHandler.error(res, "please send valid credentials",CommonError.Bad_Request,); 
        }
        console.log(user.toObject());
        return SuccessHandler.success(res, CommonError.Success,user); 
    } catch (error) {
        SuccessHandler.error(res);
    }
}

module.exports = { UserSignIn, UserLogIn }