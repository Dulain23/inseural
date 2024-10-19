export const errorHandler = (statusCode = 500, message = "Internal Server Error") => {
    return {
        statusCode,
        message,
        success: false,
    };
};