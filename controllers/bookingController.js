// controllers/bookingController.mjs
import { rooms } from './roomController.js';

export const bookings = [];
console.log('Bookings:', bookings);

export function bookRoom(req, res) {
  const { customerName, date, startTime, endTime, roomId } = req.body;

  // Validate input
  if (!customerName || !date || !startTime || !endTime || !roomId) {
    return res.status(400).json({ error: 'Please provide all required information.' });
  }

  // Check if the room with the specified ID exists
  const room = rooms.find((r) => r.id === parseInt(roomId));
  if (!room) {
    return res.status(404).json({ error: 'Room not found.' });
  }

  // Check if the room is available for the specified date and time range
  const isRoomAvailable = !bookings.some(
    (booking) =>
      booking.roomId === room.id &&
      booking.date === date &&
      ((startTime >= booking.startTime && startTime < booking.endTime) ||
        (endTime > booking.startTime && endTime <= booking.endTime) ||
        (startTime <= booking.startTime && endTime >= booking.endTime))
  );

  if (!isRoomAvailable) {
    return res.status(400).json({ error: 'Room is already booked for the specified date and time range.' });
  }

  // Create a new booking
  const newBooking = {
    id: bookings.length + 1,
    customerName,
    date,
    startTime,
    endTime,
    roomId: room.id,
  };

  // Add the booking to the storage
  bookings.push(newBooking);

  // Respond with the created booking
  res.status(201).json(newBooking);
}
