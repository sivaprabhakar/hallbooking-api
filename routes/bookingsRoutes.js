import express from 'express';
import { bookRoom } from '../controllers/bookingController.js';

const router = express.Router();

// Endpoint to book a room
router.post('/', bookRoom);

export default router;