const { v4: uuidv4 } = require('uuid');
const fs = require("fs")


const LoggerMiddleware = {

    requestMiddleware: async (req, _ , next) => {
        const uniqueId = uuidv4();

        const logObject = {
            [`${uniqueId} - request`]: {
                timestamp: new Date().toISOString(),
                method: req.method,
                url: req.originalUrl,
                body: req.body,
            }

        };
        const logEntry = JSON.stringify(logObject) + '\n';
        req.id = uniqueId
        fs.appendFileSync('./log.txt', logEntry);
        next();
    },

    responseMiddleware: async (req, res, next) => {
        let send = res.send;
        res.send = c => {
            const logObject = {
                [`${req.id} - response`]: {
                    timestamp: new Date().toISOString(),
                    method: req.method,
                    url: req.originalUrl,
                    body: req.body,
                    response: c
                }

            };
            const logEntry = JSON.stringify(logObject) + '\n';
            fs.appendFileSync('./log.txt', logEntry);
            res.send = send;
            return res.send(c);
        }
        next();
    }

}

module.exports = LoggerMiddleware;