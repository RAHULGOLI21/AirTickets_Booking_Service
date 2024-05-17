const { BookingService } = require('../services/index')

const createBooking = async(req,res) =>{
    try {
        const bookingService = new BookingService();
        const response = await bookingService.create(req.body);
        return res.status(200).json({
            success: true,
            err:{},
            data : response,
            message: 'Successfully Created the Booking'
        })
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to create the booking',
            err: error
        });
    }    

}

module.exports={
    createBooking
}