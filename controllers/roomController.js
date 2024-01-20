import { bookings } from './bookingController.js'


export const rooms = [];
console.log('Rooms:', rooms);
export function createRoom(req, res) {
  const { name, seats, amenities, pricePerHour } = req.body;

  // Validate input
  if (!name || !seats || !amenities || !pricePerHour) {
    return res.status(400).json({ error: 'Please provide all required information.' });
  }

  // Create a new room
  const newRoom = {
    id: rooms.length + 1,
    name,
    seats,
    amenities,
    pricePerHour,
  };

  // Add the room to the storage
  rooms.push(newRoom);

  // Respond with the created room
  res.status(201).json(newRoom);
}


export function getAllRooms(req, res) {
    try {
      // Initialize an empty array for roomsWithBookings
      let roomsWithBookings = [];
  
      // Retrieve all rooms
      roomsWithBookings = rooms.map((room) => {
        // Find bookings for the current room
        const roomBookings = bookings.filter((booking) => booking.roomId === room.id);
  
        // Extract booked data
        const bookedData = roomBookings.map((booking) => ({
          customerName: booking.customerName,
          date: booking.date,
          startTime: booking.startTime,
          endTime: booking.endTime,
        }));
  
        // Return room with booked data
        return {
          id: room.id,
          name: room.name,
          seats: room.seats,
          amenities: room.amenities,
          pricePerHour: room.pricePerHour,
          bookedData,
        };
      });
  
      // Respond with rooms and booked data
      res.status(200).json(roomsWithBookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve rooms with booked data.' });
    }
  }