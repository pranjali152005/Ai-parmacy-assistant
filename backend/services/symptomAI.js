/**
 * Symptom AI Service
 * Maps symptoms to possible conditions and medicine suggestions.
 */

const symptomDatabase = {
  fever: { conditions: ['Infection', 'Viral illness', 'Inflammation'], medicines: ['Paracetamol', 'Ibuprofen'] },
  cough: { conditions: ['Common cold', 'Bronchitis', 'Respiratory infection'], medicines: ['Cough syrup', 'Amoxicillin (if bacterial)'] },
  headache: { conditions: ['Tension headache', 'Migraine', 'Dehydration'], medicines: ['Paracetamol', 'Ibuprofen'] },
  'stomach pain': { conditions: ['Gastritis', 'Acid reflux', 'IBS'], medicines: ['Omeprazole', 'Antacids'] },
  allergy: { conditions: ['Allergic rhinitis', 'Urticaria', 'Hay fever'], medicines: ['Cetirizine', 'Loratadine'] },
  'high blood pressure': { conditions: ['Hypertension'], medicines: ['Lisinopril', 'Amlodipine'] },
  diabetes: { conditions: ['Type 2 Diabetes', 'Pre-diabetes'], medicines: ['Metformin', 'Glipizide'] },
};

/**
 * Analyze symptoms and return possible conditions + medicine suggestions.
 * @param {string[]} symptoms
 * @returns {{ condition: string, medicines: string[], confidence: string }[]}
 */
const analyzeSymptoms = (symptoms) => {
  const results = [];
  symptoms.forEach(s => {
    const key = Object.keys(symptomDatabase).find(k => s.toLowerCase().includes(k));
    if (key) {
      const entry = symptomDatabase[key];
      results.push({
        symptom: s,
        possibleConditions: entry.conditions,
        suggestedMedicines: entry.medicines,
        confidence: 'moderate',
        disclaimer: 'For informational purposes only. Consult a healthcare professional.'
      });
    }
  });
  return results;
};

module.exports = { analyzeSymptoms };
