const RestAPI = require("../axios");


const GetUser = async (req, res, next) => {
    const url = req.originalUrl;
    try {
        RestAPI.get(url);
        return res.send({ "name": "varsha", "email": "123@gmail.com", "password": "123456" });

    } catch (error) {
        res.status(500).send("something went wrong");
     }
};

const GetUserUsingFormData = (req, res) => {
    try {

        const data = req.body;
        const url = req.originalUrl;
        RestAPI.post({ url, data });
        return res.json({ "Success": req.body.name });
    } catch (error) {
        res.status(500).send("something went wrong");

    }
}


module.exports = { GetUser, GetUserUsingFormData };