const express = require("express");
const app = express();
const LoggerMiddleware = require('./middleware/logger_text');
const router = require("./router/user_router");
const { connectToMongoDB } = require('./connect')
const PORT = process.env.PORT;


const mongoURL = process.env.MONGODB_URI;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(LoggerMiddleware.requestMiddleware);
app.use(LoggerMiddleware.responseMiddleware);
app.use('/users', router);

connectToMongoDB(mongoURL).then(() => app.listen(PORT, () => console.log('Start server `${PORT}`')));





