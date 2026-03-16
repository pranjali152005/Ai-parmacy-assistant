const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../database/medicines.json');
const getMedicines = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

// GET /api/medicines  — list all or search
router.get('/', (req, res) => {
  const { q, category } = req.query;
  let meds = getMedicines();
  if (q) {
    const term = q.toLowerCase();
    meds = meds.filter(m =>
      m.name.toLowerCase().includes(term) ||
      m.genericName.toLowerCase().includes(term) ||
      m.uses.some(u => u.toLowerCase().includes(term)) ||
      m.category.toLowerCase().includes(term)
    );
  }
  if (category) {
    meds = meds.filter(m => m.category.toLowerCase().includes(category.toLowerCase()));
  }
  res.json(meds);
});

// GET /api/medicines/:id
router.get('/:id', (req, res) => {
  const med = getMedicines().find(m => m.id === req.params.id);
  if (!med) return res.status(404).json({ message: 'Medicine not found' });
  res.json(med);
});

// POST /api/medicines/interaction-check  — check two medicines
router.post('/interaction-check', (req, res) => {
  const { med1, med2 } = req.body;
  const meds = getMedicines();
  const m1 = meds.find(m => m.name.toLowerCase() === med1?.toLowerCase());
  const m2 = meds.find(m => m.name.toLowerCase() === med2?.toLowerCase());

  if (!m1 || !m2) return res.status(404).json({ message: 'One or both medicines not found' });

  const interactions = m1.interactions.filter(i =>
    i.toLowerCase().includes(m2.name.toLowerCase())
  );

  res.json({
    medicine1: m1.name,
    medicine2: m2.name,
    interactions: interactions.length ? interactions : ['No known interactions found'],
    safe: interactions.length === 0
  });
});

module.exports = router;
