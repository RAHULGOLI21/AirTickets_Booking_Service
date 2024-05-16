Project Setup

 npx sequelize model:generate --name Booking --attributes flightId:integer,userId:integer,status:enum
 npx sequelize db:migrate
 npx sequelize migration:create --name modify_bookings_add_new_fields