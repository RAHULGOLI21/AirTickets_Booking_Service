const { BookingService } = require('../services/index')
const { createChannel, publishMessage } = require('../utils/messageQueue')
const { REMINDER_BINDING_KEY } = require('../config/serverConfig')
class BookingController {

    constructor(){
    }

    async sendMessageToQueue(req,res){
        const channel = await createChannel();
        const data = 'Success';
        publishMessage(channel, REMINDER_BINDING_KEY,JSON.stringify(data));
        return res.status(200).json({
            success: true,
            err:{},
            data : {},
            message: 'Published Message Successfully'
        })
    }


    async createBooking(req,res){
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
}

module.exports=BookingController