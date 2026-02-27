const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
  nombreCliente: { type: String, required: true },
  fecha: { type: Date, required: true },
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  cantidad: { type: Number, required: true, min: 1 },
  estado: { type: String, enum: ['pendiente', 'confirmada', 'cancelada'], default: 'pendiente' }
}, { timestamps: true });

module.exports = mongoose.model('Reserva', ReservaSchema);
