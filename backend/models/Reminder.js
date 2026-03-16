const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicineName: { type: String, required: true },
  dosage: { type: String },
  times: [String],            // e.g. ["08:00", "14:00", "20:00"]
  daysOfWeek: [String],       // e.g. ["Mon","Tue","Wed"]
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  isActive: { type: Boolean, default: true },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Reminder', ReminderSchema);
