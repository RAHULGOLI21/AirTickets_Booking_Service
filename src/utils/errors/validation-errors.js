const { StatusCodes } = require('http-status-codes');

class ValidationError extends Error {

    constructor(errors) {
        super(); // we call super constructor so that Error Object is Created
        let explaination=[]
        errors.forEach(error => {
            explaination.push(error.message)
        });
        this.name='ValidationError'
        this.message = message
        this.explaination = explaination
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = ValidationError