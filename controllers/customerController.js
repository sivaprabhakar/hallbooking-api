
import { bookings } from './bookingController.js';
import { rooms } from './roomController.js';

export function getAllCustomersWithBookedData(req, res) {
  try {
    // Fetch all bookings with associated room information
    const customersWithBookedData = bookings.map((booking) => {
      const room = rooms.find((r) => r.id === booking.roomId);

      if (room) {
        return {
          customerName: booking.customerName,
          roomName: room.name,
          date: booking.date,
          startTime: booking.startTime,
          endTime: booking.endTime,
        };
      }

      return null; // Handle cases where the room for the booking is not found
    }).filter(Boolean); // Remove null entries

    // Respond with customers and booked data
    res.status(200).json(customersWithBookedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve customers with booked data.' });
  }
}

export function getBookingCountsByCustomer(req, res) {
    try {
      // Create a map to store booking counts for each customer
      const bookingCountsByCustomer = new Map();
  
      // Iterate through bookings and aggregate counts for each customer
      bookings.forEach((booking) => {
        const customerName = booking.customerName;
  
        // Check if the customer exists in the map
        if (bookingCountsByCustomer.has(customerName)) {
          // Increment the booking count for the customer
          bookingCountsByCustomer.set(customerName, bookingCountsByCustomer.get(customerName) + 1);
        } else {
          // Initialize the booking count for the customer
          bookingCountsByCustomer.set(customerName, 1);
        }
      });
  
      // Create an array of objects with booking counts and details
      const bookingDetails = Array.from(bookingCountsByCustomer.entries()).map(([customerName, bookingCount]) => {
        const customerBookings = bookings.filter((booking) => booking.customerName === customerName);
        const latestBooking = customerBookings.reduce((latest, current) => (current.date > latest.date ? current : latest), {});
  
        return {
          customerName,
          roomName: rooms.find((room) => room.id === latestBooking.roomId)?.name,
          date: latestBooking.date,
          startTime: latestBooking.startTime,
          endTime: latestBooking.endTime,
          bookingId: latestBooking.id,
          bookingDate: latestBooking.bookingDate, // Assuming bookingDate is a property of booking
          bookingStatus: latestBooking.bookingStatus, // Assuming bookingStatus is a property of booking
          totalBookings: bookingCount,
        };
      });
  
      // Respond with the booking details
      res.status(200).json(bookingDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve booking details.' });
    }
  }