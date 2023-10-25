// index.js
const express = require('express');
const bodyParser = require('body-parser');
const roomRoutes = require('./routes/rooms');
const bookingRoutes = require('./routes/bookings');

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

app.use('/rooms', roomRoutes);
app.use('/bookings', bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
