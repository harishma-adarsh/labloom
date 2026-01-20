const mongoose = require('mongoose');

const hospitalSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hospitalName: { type: String, required: true },
    address: { type: String },
    contactNumber: { type: String },
    rating: { type: Number, default: 0 },
    imageURL: { type: String },
    isApproved: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Hospital', hospitalSchema);
