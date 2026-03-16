const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../database/medicines.json');
const getMedicines = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

// Rule-based NLP response engine
const buildResponse = (message) => {
  const msg = message.toLowerCase();
  const meds = getMedicines();

  // Check if asking about a specific medicine
  const matchedMed = meds.find(m =>
    msg.includes(m.name.toLowerCase()) || msg.includes(m.genericName.toLowerCase())
  );

  if (matchedMed) {
    if (msg.includes('side effect') || msg.includes('reaction')) {
      return `Side effects of **${matchedMed.name}**: ${matchedMed.sideEffects.join(', ')}. ${matchedMed.warnings}`;
    }
    if (msg.includes('dose') || msg.includes('dosage') || msg.includes('how much') || msg.includes('how many')) {
      return `**${matchedMed.name}** dosage — Adults: ${matchedMed.dosage.adult}. Children: ${matchedMed.dosage.child}.`;
    }
    if (msg.includes('use') || msg.includes('treat') || msg.includes('for what')) {
      return `**${matchedMed.name}** is used for: ${matchedMed.uses.join(', ')}.`;
    }
    if (msg.includes('interact') || msg.includes('mix') || msg.includes('combine')) {
      return `**${matchedMed.name}** interactions: ${matchedMed.interactions.join('; ')}.`;
    }
    if (msg.includes('store') || msg.includes('storage') || msg.includes('keep')) {
      return `Storage for **${matchedMed.name}**: ${matchedMed.storage}`;
    }
    // Default: full summary
    return `**${matchedMed.name}** (${matchedMed.genericName})\n📋 Category: ${matchedMed.category}\n💊 Uses: ${matchedMed.uses.join(', ')}\n⚠️ Side effects: ${matchedMed.sideEffects.slice(0,3).join(', ')}\n📏 Adult dose: ${matchedMed.dosage.adult}`;
  }

  // Symptom-based suggestions
  const symptomMap = {
    fever: ['Paracetamol', 'Ibuprofen'],
    pain: ['Paracetamol', 'Ibuprofen'],
    headache: ['Paracetamol', 'Ibuprofen'],
    cold: ['Cetirizine', 'Paracetamol'],
    allergy: ['Cetirizine'],
    diabetes: ['Metformin'],
    cholesterol: ['Atorvastatin'],
    'blood pressure': ['Lisinopril'],
    hypertension: ['Lisinopril'],
    acidity: ['Omeprazole'],
    reflux: ['Omeprazole'],
    infection: ['Amoxicillin'],
    antibiotic: ['Amoxicillin'],
  };

  for (const [symptom, drugs] of Object.entries(symptomMap)) {
    if (msg.includes(symptom)) {
      return `For **${symptom}**, commonly used medicines include: ${drugs.join(', ')}. Please consult a pharmacist or doctor before use.`;
    }
  }

  // General greetings and fallbacks
  if (msg.match(/^(hi|hello|hey|good morning|good evening)/)) {
    return "Hello! 👋 I'm your AI Pharmacy Assistant. You can ask me about medicines, dosages, side effects, or symptoms. How can I help you today?";
  }
  if (msg.includes('thank')) {
    return "You're welcome! Stay healthy. 😊 Feel free to ask anything else.";
  }
  if (msg.includes('remind') || msg.includes('reminder')) {
    return "You can set medicine reminders in the **Reminders** section. I'll help you stay on schedule!";
  }
  if (msg.includes('order') || msg.includes('buy')) {
    return "You can order medicines in the **Order Medicine** section. We deliver to your doorstep!";
  }
  if (msg.includes('pharmacy') || msg.includes('near')) {
    return "Find nearby pharmacies in the **Nearby Medical** section. We'll show you open pharmacies on the map.";
  }

  return "I'm not sure about that. Try asking me about a specific medicine name, symptoms, or say 'list medicines'. I'm here to help! 💊";
};

exports.ask = (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: 'Message is required' });

  const response = buildResponse(message);
  res.json({ reply: response, timestamp: new Date() });
};

exports.symptomCheck = (req, res) => {
  const { symptoms } = req.body;
  const meds = getMedicines();
  const results = [];

  symptoms.forEach(symptom => {
    const matched = meds.filter(m =>
      m.uses.some(u => u.toLowerCase().includes(symptom.toLowerCase()))
    );
    if (matched.length) results.push({ symptom, medicines: matched.map(m => m.name) });
  });

  res.json({ results, disclaimer: 'Always consult a licensed pharmacist or physician before taking any medication.' });
};
