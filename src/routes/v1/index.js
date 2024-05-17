const express = require('express');
const { BookingController } = require('../../controllers');

const router= express.Router();

router.post('/booking',BookingController.createBooking)
module.exports= router;