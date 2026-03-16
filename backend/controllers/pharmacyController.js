const pharmacies = [
  { id: 'ph_001', name: 'MedCare Pharmacy', address: 'MG Road, Pune', phone: '+91-20-1234-5678', openHours: '8 AM – 10 PM', rating: 4.5, isOpen: true, lat: 18.5204, lng: 73.8567, distance: 0.8 },
  { id: 'ph_002', name: 'Apollo Pharmacy', address: 'FC Road, Pune', phone: '+91-20-2345-6789', openHours: '9 AM – 9 PM', rating: 4.7, isOpen: true, lat: 18.5120, lng: 73.8400, distance: 1.2 },
  { id: 'ph_003', name: 'HealthPlus Chemist', address: 'Koregaon Park, Pune', phone: '+91-20-3456-7890', openHours: '24 Hours', rating: 4.3, isOpen: true, lat: 18.5362, lng: 73.8951, distance: 2.1 },
  { id: 'ph_004', name: 'Wellness Pharmacy', address: 'Baner, Pune', phone: '+91-20-4567-8901', openHours: '8 AM – 11 PM', rating: 4.2, isOpen: false, lat: 18.5590, lng: 73.7868, distance: 4.5 },
  { id: 'ph_005', name: 'Lifeline Drugs', address: 'Hadapsar, Pune', phone: '+91-20-5678-9012', openHours: '9 AM – 9 PM', rating: 4.0, isOpen: true, lat: 18.4965, lng: 73.9250, distance: 5.8 }
];

exports.getAllPharmacies = (req, res) => res.json(pharmacies);

exports.getNearbyPharmacies = (req, res) => {
  const { lat, lng, radius = 5 } = req.query;
  // For demo, return pharmacies sorted by distance
  const sorted = [...pharmacies].sort((a, b) => a.distance - b.distance);
  res.json(sorted);
};

exports.getPharmacyById = (req, res) => {
  const ph = pharmacies.find(p => p.id === req.params.id);
  if (!ph) return res.status(404).json({ message: 'Pharmacy not found' });
  res.json(ph);
};
