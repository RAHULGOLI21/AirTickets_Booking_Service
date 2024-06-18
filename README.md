 Welcome to BOOKING_SERVICE

Project Setup

Clone the project on your local Execute npm install on the same path as of your root directory of teh downloaded project Create a .env file in the root directory and add the following environment variable ```PORT=3002```  , ```DB_SYNC=false/true ``` , ```FLIGHT_SERVICE_URL=http://localhost:30001```, ```MESSAGE_BROKER_URL = 'amqp://localhost'``` , ```REMINDER_EXCHANGE_NAME=AIRLINE_BOOKING```,```REMINDER_BINDING_KEY=REMINDER_SERVICE``` accordingly. Inside the src/config folder create a new file config.json and then add the following piece of json

```
{
  "development": {
    "username": <YOUR_DB_LOGIN_NAME>,
    "password": <YOUR_DB_PASSWORD>,
    "database": "BOOKING_DB_DEV",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```
Once you've added your db config as listed above, go to the src folder from your terminal and execute 
```npx sequelize db:create``` to create ```BOOKING_DEV_DB``` the and then execute ```npx sequelize db:migrate``` for migrating/creating the tables for the models below in ```BOOKING_DEV_DB```


Command to create a new migrtaion file to modify the table
``` npx sequelize migration:create --name modify_bookings_add_new_fields```
### TABLES

BOOKINGS Table
 id , flightId, userId, status, noOfSeats, totalCost, updatedAt, createdAt
```npx sequelize model:generate --name Booking --attributes flightId:integer,userId:integer,status:enum,noOfSeats:integer,totalCost:integer```
