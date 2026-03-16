const mongoose = require('mongoose');

const PharmacySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: String,
  email: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]   // [longitude, latitude]
  },
  openHours: { type: String, default: '9:00 AM – 9:00 PM' },
  rating: { type: Number, default: 4.0, min: 0, max: 5 },
  isOpen: { type: Boolean, default: true },
  medicines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' }]
}, { timestamps: true });

PharmacySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Pharmacy', PharmacySchema);
