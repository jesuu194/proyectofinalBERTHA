const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reserva.controller');

// CRUD Reservas
router.get('/get/all', reservaController.getAllReservas);
router.get('/get/:id', reservaController.getReservaById);
router.post('/post', reservaController.createReserva);
router.patch('/update/:id', reservaController.updateReserva);
router.delete('/delete/:id', reservaController.deleteReserva);

module.exports = router;
