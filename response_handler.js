const  CommonError = require("./error")

const SuccessHandler = {
    success: (res, status, data) => {
        return res.status(status ||  CommonError.Success).json({
            success: true,
            data: data || "successful",
        });
    },  
    
   error: (res, message,status) => {
        return res.status(status ??  CommonError.Server_Error).json({
            success: false,
            message: message || "Something went wrong",
        });
    },
}

module.exports = SuccessHandler;