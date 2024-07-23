const { default: mongoose } = require("mongoose");
const RestAPI = require("../axios");
const User = require("../model/user_model");
const { generateUsername } = require("unique-username-generator");
const SuccessHandler = require('../response_handler');
const CommonError = require('../error');



const GetAllUser = async (req, res, _) => {
    try {
        const data = await User.find({}, req.body);
        console.log(data.map(e => {
            const obj = e.toObject();
            return obj;
        }));
        return SuccessHandler.success(res, CommonError.Success, data);
    } catch (error) {
        SuccessHandler.error(res);
    }
};

const UpdateUser = async (req, res, next) => {
    const url = req.body;
    try {
        RestAPI.get(url);
        return SuccessHandler.success(res, CommonError.Success, { "name": "varsha", "email": "123@gmail.com", "password": "123456" });
    } catch (error) {
        SuccessHandler.error(res);
    }
};



const RandomUserAdded = async (req, res) => {
    try {
        for (let index = 0; index < 1100; index++) {
            const name = generateUsername();
            const email = `jadubaby@gmail.com ${index}`;
            const age = index;
            const password = `${index}${index + 1}${index + 2}`;
            const phoneNumber = `${index}${index}${index + 1}${index + 2}${index}${index + 1}${index + 2}${index}${index + 1}${index + 2}`;
            const newUser = User({ name, email, password, age, phoneNumber });
            await newUser.save();
        }
        return SuccessHandler.success(res, CommonError.Success, { "Success": true });
    } catch (error) {
        SuccessHandler.error(res);
    }
}



const GetQueryBasedField = async (req, res) => {
    try {
        const data = await User.find({}, req.body).limit(10);
        const modifiedData = data.map(e => {
            const obj = e.toObject();
            obj.link = `http://localhost:2001/users/${obj._id}`;
            return obj;
        });
        return SuccessHandler.success(res, CommonError.Success, { "data": modifiedData });
    } catch (error) {
        SuccessHandler.error();
    }
}

const GetParticularUserData = async (req, res) => {
    try {
        const data = await User.findOne({ "_id": new mongoose.Types.ObjectId(req.params.id) });
        console.log(data.toObject());
        return SuccessHandler.success(res, CommonError.Success, data);
    } catch (error) {
        SuccessHandler.error();
    }
}

const UpdateParticularUserData = async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate({ "_id": new mongoose.Types.ObjectId(req.params.id) },
            { $set: req.body });
        const response = await User.findById({ "_id": new mongoose.Types.ObjectId(req.params.id) });
        console.log(response);
        return SuccessHandler.success(res, CommonError.Success, response);
    } catch (error) {
        SuccessHandler.error();
    }
}




module.exports = { GetAllUser, RandomUserAdded, GetQueryBasedField, GetParticularUserData, UpdateUser, UpdateParticularUserData };