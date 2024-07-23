const ErrorHandler = {
    success: (res, status, data) => {
        return res.status(status || 200).json({
            success: true,
            data: data || "successful",
        });
    },    error: (res,status, message) => {
        return res.status(status ?? 500).json({
            success: false,
            message: message || "Something went wrong",
        });
    },
}

module.exports = ErrorHandler;