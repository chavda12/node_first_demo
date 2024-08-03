const CommonError = require("./error")

const ResponseHandler = {
    success: (res, data, status) => {
        return res.status(status || 200).json({
            success: true,
            data: data || "successful",
        });
    },

    error: ({res, message, status,errorMessage}) => {
        console.log(`error:${errorMessage}`);
        return res.status(status ?? CommonError.Server_Error).json({
            success: false,
            message: message || "Something went wrong",
        });
    },
}

module.exports = ResponseHandler;