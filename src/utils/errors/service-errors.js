const { StatusCodes } = require('http-status-codes');

class ServiceError extends Error {

    constructor(
        message = 'Something went wrong',
        explaination = 'Something went wrong',
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    ) {
        super(); // we call super constructor so that Error Object is Created
        this.name='ServiceError'
        this.message = message
        this.explaination = explaination
        this.statusCode = statusCode
    }
}

module.exports = ServiceError