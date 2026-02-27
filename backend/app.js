const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const reservaRoutes = require('./src/routes/reserva.routes');
const errorHandler = require('./src/middlewares/error.middleware');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Documentación interactiva Swagger

// Rutas de reservas
app.use('/api/v1/reserva', reservaRoutes);

// Middleware de errores
app.use(errorHandler);

module.exports = app;
