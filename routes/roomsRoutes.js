import express from 'express';
import { createRoom } from '../controllers/roomController.js';
import { getAllRooms } from '../controllers/roomController.js'
const router = express.Router();

// Endpoint to create a room
router.post('/', createRoom);
router.get('/', getAllRooms);
export default router;