// routes/bookings.js
const express = require('express');
const router = express.Router();
const common = require('../common/common');
const roomModel = require('../models/room');


router.post('/create', (req, res) => {
  try {
    const { customerName, date, startTime, endTime, roomId } = req.body;
    const bookings = common.getAllBookings();

    // Check if the room is already booked for the given date and time
    const conflict = bookings.some((booking) => {
      return (
        booking.roomId === roomId &&
        booking.date === date &&
        ((startTime >= booking.startTime && startTime < booking.endTime) ||
          (endTime > booking.startTime && endTime <= booking.endTime))
      );
    });

    if (conflict) {
      throw new Error('Room already booked for the given date and time');
    }

    const booking = common.createBooking(customerName, date, startTime, endTime, roomId);
    res.send({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.get('/list', (req, res) => {
  const bookings = common.getAllBookings();
  res.send({ success: true, data: bookings });
});
router.get('/customer/:customerName', (req, res) => {
    const { customerName } = req.params;
    const bookings = common.getAllBookings();
  
    const customerBookings = bookings.filter((booking) => booking.customerName === customerName);
  
    if (customerBookings.length === 0) {
      return res.json({ success: true, data: [] });
    }
  
    const customerBookingDetails = customerBookings.map((booking) => {
      const room = roomModel.getRoomById(booking.roomId);
      return {
        customerName: booking.customerName,
        roomName: room.name,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        bookingId: booking.id,
        bookingDate: booking.bookingDate,
        bookingStatus: booking.bookingStatus,
      };
    });
  
    res.send({ success: true, data: customerBookingDetails });
  });
  
 

module.exports = router;
