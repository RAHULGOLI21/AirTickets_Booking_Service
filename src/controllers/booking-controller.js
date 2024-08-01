const { BookingService } = require('../services/index')
const { createChannel, publishMessage } = require('../utils/messageQueue')
const { REMINDER_BINDING_KEY } = require('../config/serverConfig')
class BookingController {

    constructor(){
    }

    async sendMessageToQueue(req,res){
        const channel = await createChannel();
        const payload = {  
            data:{
                subject: ' This ticket is created from the queue',
                content: ' This is a queue logic example',
                recepientEmail: 'golirahul21@gmail.com',
                notificationTime: ' 2024-05-24 11:49:00',
            },
            service: 'CREATE_TICKET'
            // The service name can be  SMS_SERVICE , EMAIL_SERVICE etc 
            // i.e from booking service we are passing the "service" type to the notificationService
            // so that in notificationService the respective service can subscribe the message.
        };
        publishMessage(channel, REMINDER_BINDING_KEY,JSON.stringify(payload));
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