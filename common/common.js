
const bookings = [];

exports.createBooking = (customerName, date, startTime, endTime, roomId) => {
  const booking = {
    id: bookings.length + 1,
    customerName,
    date,
    startTime,
    endTime,
    roomId,
  };
  bookings.push(booking);
  return booking;
};

exports.getAllBookings = () => bookings;
