const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  genericName: { type: String, trim: true },
  category: { type: String },
  dosage: {
    adult: String,
    child: String
  },
  uses: [String],
  sideEffects: [String],
  interactions: [String],
  contraindications: [String],
  warnings: String,
  storage: String,
  manufacturer: String,
  price: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  image: { type: String, default: '💊' }
}, { timestamps: true });

MedicineSchema.index({ name: 'text', genericName: 'text', category: 'text' });

module.exports = mongoose.model('Medicine', MedicineSchema);
