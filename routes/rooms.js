// routes/rooms.js
const express = require('express');
const router = express.Router();
const roomModel = require('../models/room');

router.post('/create', (req, res) => {
  const { name, seats, amenities, price } = req.body;
  const room = roomModel.createRoom(name, seats, amenities, price);
  res.send({ success: true, data: room });
});

router.get('/list', (req, res) => {
  const rooms = roomModel.getAllRooms();
  res.send({ success: true, data: rooms });
});

module.exports = router;
