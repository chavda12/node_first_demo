const express = require("express");
const app = express();
const PORT = '2001';
const RestAPI = require("./axios");
const LoggerMiddleware = require('./middleware/logger_text');
const router = require("./router/user_router");
const { connectToMongoDB } = require('./connect')


connectToMongoDB('mongodb://localhost:27017/node-demo-first').then(() => console.log("mongodb connect"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(LoggerMiddleware.requestMiddleware);
app.use(LoggerMiddleware.responseMiddleware);
app.use('/users', router);

app.listen(PORT, () => console.log('Start server `${PORT}`'));


