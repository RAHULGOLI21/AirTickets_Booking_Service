const amqplib = require('amqplib');
const { MESSAGE_BROKER_URL, EXCHANGE_NAME} = require('../config/serverConfig')
const createChannel = async()=>{
    try {
        //create connnection to rabbitmq using the amqplib client
        const connection =  await amqplib.connect(MESSAGE_BROKER_URL);
        //create channel to publish and subscribe messages
        const channel = await connection.createChannel();
        //EXCHANGE_NAME : name of the distributor
        await channel.assertExchange(EXCHANGE_NAME,'direct',false);
        return channel;
    } catch (error) {
        throw error;
    }
}


const subscribeMessage = async(channel, service, binding_key)=>{
    try {
        const applicationQueue = await channel.assertQueue('REMINDER_QUEUE');
        channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

        channel.consume(applicationQueue.queue,msg =>{
            console.log('received data', msg.content.toString());
            channel.ack(msg);
        })

    } catch (error) {
        throw error;
    }
}

const publishMessage = async(channel, binding_key,message) =>{
    try {
        // will create a new queue also if doesn't exist
        await channel.assertQueue('REMINDER_QUEUE');
        // exchange distributor will publish the message to the queue with the bindingKey provided
        //binding key is UNIQUE to the queue
        await channel.publish(EXCHANGE_NAME,binding_key, Buffer.from(message));
    } catch (error) {
        throw error;
    }
}

module.exports ={
    createChannel,
    subscribeMessage,
    publishMessage,
}