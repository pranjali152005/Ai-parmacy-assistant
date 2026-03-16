/**
 * PharmaAI — Frontend API Service
 * Centralised HTTP client for all backend calls.
 */

const BASE = window.location.origin;

const headers = () => {
  const token = localStorage.getItem('pharmaToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

async function request(method, path, body = null) {
  const opts = { method, headers: headers() };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}/api${path}`, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}

// ── Auth ──
export const auth = {
  register: (data)  => request('POST', '/auth/register', data),
  login:    (data)  => request('POST', '/auth/login', data),
};

// ── Medicines ──
export const medicines = {
  list:             (q, category) => request('GET', `/medicines?${new URLSearchParams({...(q?{q}:{}), ...(category?{category}:{})})}`),
  get:              (id)          => request('GET', `/medicines/${id}`),
  checkInteraction: (med1, med2)  => request('POST', '/medicines/interaction-check', { med1, med2 }),
};

// ── Chatbot ──
export const chatbot = {
  ask:           (message)  => request('POST', '/chatbot/ask', { message }),
  symptomCheck:  (symptoms) => request('POST', '/chatbot/symptom-check', { symptoms }),
};

// ── Orders ──
export const orders = {
  create:       (data)   => request('POST', '/orders', data),
  listByUser:   (userId) => request('GET',  `/orders/user/${userId}`),
  get:          (id)     => request('GET',  `/orders/${id}`),
  updateStatus: (id, status) => request('PATCH', `/orders/${id}/status`, { status }),
};

// ── Pharmacies ──
export const pharmacies = {
  list:   ()              => request('GET', '/pharmacies'),
  nearby: (lat, lng)      => request('GET', `/pharmacies/nearby?lat=${lat}&lng=${lng}`),
  get:    (id)            => request('GET', `/pharmacies/${id}`),
};

export default { auth, medicines, chatbot, orders, pharmacies };
