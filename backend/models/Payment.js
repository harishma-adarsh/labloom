const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
    paymentMethod: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
