const { StatusCodes } = require('http-status-codes');

const { ValidationError, ServiceError } = require('../utils/errors/index')
const { Booking } = require('../models/index');


class BookingRepository{

    async create(data){
        try {
            const booking = await Booking.create(data);
            return booking;
            
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

    async update(flightId,data){
        try {
            // we are doing in this method because we need a booking object
            const booking = await Booking.findByPk(flightId);
            if(data.status){
                booking.status=data.status
            }
            await booking.save();
            return booking
        } catch (error) {
            if(error.name=='SequelizeValidationError')
                throw new ValidationError(error);
            throw new ServiceError(
                'RepositoryError',
                'Not able to update booking',
                'There was an issue in update booking.Please try later',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
    
}

module.exports = BookingRepository