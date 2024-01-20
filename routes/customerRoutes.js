// routes/customerRoutes.js
import express from 'express';
import { getAllCustomersWithBookedData } from '../controllers/customerController.js';
import { getBookingCountsByCustomer } from '../controllers/customerController.js';

const router = express.Router();

// Define the route for listing all customers with booked data
router.get('/customers', getAllCustomersWithBookedData);
router.get('/bookingCountsByCustomer', getBookingCountsByCustomer);
export default router;
