// index.js
import express from 'express';

import roomRoutes from './routes/roomsRoutes.js';
import bookingSRoutes from './routes/bookingsRoutes.js';
import customerRoutes from './routes/customerRoutes.js'
const app = express();
const PORT = 8000;

app.use(express.json());

app.use('/rooms', roomRoutes);
app.use('/bookings', bookingSRoutes);
app.use('/api', customerRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
