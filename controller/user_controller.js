const { default: mongoose } = require("mongoose");
const RestAPI = require("../axios");
const User = require("../model/user_model");
const { generateUsername } = require("unique-username-generator");
const ErrorHandler = require('../error_handler')



const GetUser = async (req, res, next) => {
    const url = req.originalUrl;
    try {
        RestAPI.get(url);
        return ErrorHandler.success(res, 200, { "name": "varsha", "email": "123@gmail.com", "password": "123456" });
    } catch (error) {
        ErrorHandler.error();
    }
};

const UserSignIn = (req, res) => {
    try {

        const data = req.body;
        const url = req.originalUrl;
        RestAPI.post({ url, data });
        const newUser = User({ name: data.name, email: data.email, password: data.password });
        newUser.save().then(() => {
            console.log('user created');
        }).catch((error) => {
            console.error("error creating user:", error);
        });
        return ErrorHandler.success(res, 200, { "Success": req.body.name });

    } catch (error) {
        ErrorHandler.error();

    }
}

const UserLogIn = (req, res) => {
    try {
        const data = req.body;
        const url = req.originalUrl;
        const { email, password } = req.body;
        RestAPI.post({ url, data });
        const user = User.findOne({ email, password });
        console.log(user);
    } catch (error) {
        ErrorHandler.error();

    }
}

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
        return ErrorHandler.success(res, 200, { "Success": true });
    } catch (error) {
        ErrorHandler.error();
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
        return ErrorHandler.success(res, 200, { "data": modifiedData });
    } catch (error) {
        ErrorHandler.error();
    }
}

const GetParticularUserData = async (req, res) => {
    try {
        const data = await User.findOne({ "_id": new mongoose.Types.ObjectId(req.params.id) });
        console.log(data.toObject());
        return ErrorHandler.success(res, 200, data);
    } catch (error) {
        ErrorHandler.error();
    }
}



module.exports = { GetUser, UserSignIn, UserLogIn, RandomUserAdded, GetQueryBasedField, GetParticularUserData };