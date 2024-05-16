const { StatusCodes } = require('http-status-codes');

const { ValidationError, ServiceError } = require('../utils/errors/index')
const { Booking } = require('../models/index');

class BookingRepository{

    async create(data){
        try {
            const booking = await Booking.create(data);
            return booking
        } catch (error) {
            if(error.name=='SequelizeValidationError')
                throw new ValidationError(error);
            throw new ServiceError(
                'RepositoryError',
                'Not able to create booking',
                'There was an issue in create booking.Please try later',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
}

module.exports = BookingRepository