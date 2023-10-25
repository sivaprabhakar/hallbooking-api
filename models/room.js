
const rooms = [];

exports.createRoom = (name, seats, amenities, price) => {
  const room = { id: rooms.length + 1, name, seats, amenities, price };
  rooms.push(room);
  return room;
};

exports.getAllRooms = () => rooms;
exports.getRoomById = (id) => {
  return rooms.find((room) => room.id === id);
};
