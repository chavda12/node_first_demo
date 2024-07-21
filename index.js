const express = require("express");
const app = express();
const PORT = '2001';
const RestAPI = require("./axios");
const LoggerMiddleware = require('./middleware/logger_text');
const router = require("./router/user_router")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(LoggerMiddleware.requestMiddleware);


app.use(LoggerMiddleware.responseMiddleware);


app.use('/users', router);


// app.post('/', (req, res) => {
//     try {
//         console.log(req.id)
//         const url = req.originalUrl;
//         const { name, password, email } = req.body;
//         if (!name || !password || !email) {
//             return res.status(400).json({ success: false, error: "Name, password, and email are required" });
//         }
//         const data = {
//             name, password, email
//         };
//         RestAPI.post({ url, data });
//         return res.json({ "Success": true });
//     } catch (error) {

//     }
// });

// app.post('/formData', (req, res) => {
//     try {

//         const data = req.body;
//         const url = req.originalUrl;
//         RestAPI.post({ url, data });
//         return res.json({ "Success": req.body.name });
//     } catch (error) {

//     }
// });


app.listen(PORT, () => console.log('Start server `${PORT}`'));


