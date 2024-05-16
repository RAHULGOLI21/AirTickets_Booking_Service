class AppError extends Error {

    constructor(
        name,
        message,
        explaination,
        statusCode,
    ) {
        super(); // we call super constructor so that Error Object is Created
        this.name=name
        this.message = message
        this.explaination = explaination
        this.statusCode = statusCode
    }
}

module.exports = AppError