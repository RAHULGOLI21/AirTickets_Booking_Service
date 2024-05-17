const { BookingRepository } = require('../repository/index');
const axios = require('axios');

const { FLIGHT_SERVICE_URL } =require('../config/serverConfig');
const { ServiceError } = require('../utils/errors/index')

class BookingService{
    constructor(){
        this.bookingRepository = new BookingRepository();
    }
    async create(data){
        try {
            const flightId = data.flightId;
            const  getFlightServiceRequestURL =`${FLIGHT_SERVICE_URL}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightServiceRequestURL);
            const flightData = response.data.data;
            let priceOfFlight= flightData.price;
            if(data.noOfSeats > flightData.totalSeats){
                throw new ServiceError(
                    'Something went wrong in Booking Process',
                    'Insufficient seats in flight'
                )
            }
            const totalCost = data.noOfSeats*priceOfFlight;
            const bookingPayload={...data,totalCost} 
            //here the booking is done but the status is InProcess by default
            const booking = await this.bookingRepository.create(bookingPayload); 

             // after booking we need to update the flight DB to reduce the number of seats
            const updateFlightServiceRequestURL =`${FLIGHT_SERVICE_URL}/api/v1/flights/${flightId}` 
            await axios.patch(updateFlightServiceRequestURL,{totalSeats : flightData.totalSeats - booking.noOfSeats});

            //now we have to update the status to "Booked" after updating the flight DB
            const finalBooking = await this.bookingRepository.update(booking.id,{status:"Booked"});
            return finalBooking;
        } catch (error) {
            if(error.name == 'ValidationError' || error.name == 'SequelizeValidationError'){
                throw error;
            }
            throw new ServiceError();
        }
    }
}

module.exports = BookingService
