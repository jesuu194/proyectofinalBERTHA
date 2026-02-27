
const Reserva = require('../models/Reserva');
const Product = require('../models/Product');

// Obtener todas las reservas con paginación y filtro por estado
exports.getAllReservas = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const estado = req.query.estado;
    const filter = estado ? { estado } : {};
    const reservas = await Reserva.find(filter).populate('producto').skip(skip).limit(limit);
    const total = await Reserva.countDocuments(filter);
    res.json({ data: reservas, page, total });
  } catch (err) { next(err); }
};

// Obtener una reserva por ID
exports.getReservaById = async (req, res, next) => {
  try {
    const reserva = await Reserva.findById(req.params.id).populate('producto');
    if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json(reserva);
  } catch (err) { next(err); }
};

// Crear una reserva con validaciones y reglas de negocio
exports.createReserva = async (req, res, next) => {
  try {
    const { nombreCliente, fecha, producto, cantidad } = req.body;
    if (!nombreCliente || !fecha || !producto || !cantidad) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }
    // Regla: No permitir reservas en fechas pasadas
    if (new Date(fecha) < new Date()) {
      return res.status(400).json({ message: 'No se puede reservar en fechas pasadas' });
    }
    // Regla: No permitir reservar más stock del disponible
    const prod = await Product.findById(producto);
    if (!prod) return res.status(404).json({ message: 'Producto no encontrado' });
    if (cantidad > prod.stock) {
      return res.status(400).json({ message: 'No hay suficiente stock disponible' });
    }
    // Regla: No permitir reservas duplicadas para el mismo cliente, producto y fecha
    const exists = await Reserva.findOne({ nombreCliente, producto, fecha });
    if (exists) {
      return res.status(400).json({ message: 'Ya existe una reserva para este cliente, producto y fecha' });
    }
    // Crear reserva
    const reserva = await Reserva.create({ nombreCliente, fecha, producto, cantidad });
    // Actualizar stock del producto
    prod.stock -= cantidad;
    await prod.save();
    res.status(201).json(reserva);
  } catch (err) { next(err); }
};

// Actualizar una reserva
exports.updateReserva = async (req, res, next) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
    // Solo se permite actualizar estado o cantidad
    const { estado, cantidad } = req.body;
    if (estado) reserva.estado = estado;
    if (cantidad) reserva.cantidad = cantidad;
    await reserva.save();
    res.json(reserva);
  } catch (err) { next(err); }
};

// Eliminar una reserva
exports.deleteReserva = async (req, res, next) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (!reserva) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json({ message: 'Reserva eliminada' });
  } catch (err) { next(err); }
};
