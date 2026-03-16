const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy' },
  items: [
    {
      medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
      medicineName: String,
      quantity: { type: Number, required: true, min: 1 },
      price: Number
    }
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'dispatched', 'delivered', 'cancelled'],
    default: 'pending'
  },
  deliveryAddress: String,
  prescriptionUrl: String,
  paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded'], default: 'pending' },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
