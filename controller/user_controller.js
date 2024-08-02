const { default: mongoose } = require("mongoose");
const RestAPI = require("../axios");
const User = require("../model/user_model");
const { generateUsername } = require("unique-username-generator");
const ResponseHandler = require('../response_handler');
const CommonError = require('../error');



const GetAllUser = async (req, res, _) => {
    try {
        const data = await User.find({}, req.body);
        console.log(data.map(e => {
            const obj = e.toObject();
            return obj;
        }));
        return ResponseHandler.success(res, data);
    } catch (error) {
        ResponseHandler.error(res);
    }
};

const UpdateUser = async (req, res, next) => {
    const url = req.body;
    try {
        RestAPI.get(url);
        return ResponseHandler.success(res, { "name": "varsha", "email": "123@gmail.com", "password": "123456" });
    } catch (error) {
        ResponseHandler.error(res);
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
        return ResponseHandler.success(res, { "Success": true });
    } catch (error) {
        ResponseHandler.error(res);
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
        return ResponseHandler.success(res, { "data": modifiedData });
    } catch (error) {
        ResponseHandler.error();
    }
}

const GetParticularUserData = async (req, res) => {
    try {
        const data = await User.findOne({ "_id": new mongoose.Types.ObjectId(req.params.id) });
        console.log(data.toObject());
        return ResponseHandler.success(res, data);
    } catch (error) {
        ResponseHandler.error();
    }
}

const UpdateParticularUserData = async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate({ "_id": new mongoose.Types.ObjectId(req.params.id) },
            { $set: req.body });
        const response = await User.findById({ "_id": new mongoose.Types.ObjectId(req.params.id) });
        console.log(response);
        return ResponseHandler.success(res, response);
    } catch (error) {
        ResponseHandler.error();
    }
}

const AddUsers = async (req, res) => {
    try {
        const users = req.body.users;

        const validUsers = [];
        const invalidUsers = [];

        users.forEach(user => {
            const { name, email, password, phoneNumber } = user;

            if (name && email && password && phoneNumber) {
                validUsers.push(user);
            } else {
                invalidUsers.push(user);
            }
        });

        if (validUsers.length > 0) {
            let userUpdate = validUsers.map(user => ({
                updateOne: {
                    filter: { email: user.email },
                    update: { $set: user },
                    upsert: true
                }
            }));
            const result = await User.bulkWrite(userUpdate);
        }

        if (invalidUsers.length > 0) {

        invalidUsers.forEach(async user => {
            if (user.email) {
                try {
                    const result = await User.updateOne(
                        { email: user.email },
                        { $set: user }
                    );
                    console.log('Invalid user updated:', result);
                } catch (error) {
                    console.error('Error updating invalid user:', error);
                }
            }
        });
    }
        return ResponseHandler.success(res, {
            addedOrUpdatedUsers: validUsers,
            invalidUsers: invalidUsers,
        });
    } catch (error) {
        console.error('Error adding users:', error);
        return ResponseHandler.error(res, 'Failed to add users', CommonError.Internal_Server_Error);


    }
}




module.exports = {
    GetAllUser, RandomUserAdded, GetQueryBasedField, GetParticularUserData, UpdateUser,
    UpdateParticularUserData, AddUsers
};