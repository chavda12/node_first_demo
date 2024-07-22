const { default: mongoose } = require("mongoose");
const RestAPI = require("../axios");
const User = require("../model/user_model");
const { generateFromEmail, generateUsername } = require("unique-username-generator");



const GetUser = async (req, res, next) => {
    const url = req.originalUrl;
    try {
        RestAPI.get(url);
        return res.send({ "name": "varsha", "email": "123@gmail.com", "password": "123456" });

    } catch (error) {
        res.status(500).send("something went wrong");
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
        return res.json({ "Success": req.body.name });
    } catch (error) {
        res.status(500).send("something went wrong");

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

            // .then(() => {
            //     console.log('user created');
            // }).catch((error) => {
            //     console.error("error creating user:", error);
            // });
        }
        return res.json({ "Success": req.body.name });
    } catch (error) {
        res.status(500).send("something went wrong");


    }
}

const GetQueryBasedField = async (req, res) => {
    try {
        const data =await User.find({}, req.body).limit(10);
        const modifiedData = data.map(e => {
            const obj = e.toObject();
            obj.link = `http://localhost:2001/users/${obj._id}`;
            return obj;
        });
        return res.json(modifiedData);
    } catch (error) {
        res.status(500).send("something went wrong");

    }
}

const GetParticularUserData = async (req, res) => {
    try {
       const data =await User.findOne({"_id": new mongoose.Types.ObjectId(req.params.id)});
       console.log(data.toObject());
       return res.json(data);
    } catch (error) {
        res.status(500).send("something went wrong");

    }
}



module.exports = { GetUser, UserSignIn, UserLogIn, RandomUserAdded, GetQueryBasedField,GetParticularUserData };