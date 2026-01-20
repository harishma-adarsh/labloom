const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    preparationTime: { type: String },
    isPopular: { type: Boolean, default: false }
});

const labSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    labName: { type: String, required: true },
    location: { type: String },
    rating: { type: Number, default: 0 },
    isApproved: { type: Boolean, default: false },
    tests: [testSchema],
    availability: [{
        day: String,
        slots: [String]
    }],
    imageURL: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Lab', labSchema);
