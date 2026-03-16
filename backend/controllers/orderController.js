// In a real app these would use the Order mongoose model.
// Using in-memory store here for demo purposes.
let orders = [];
let nextId = 1;

exports.createOrder = (req, res) => {
  const order = { id: `ORD${String(nextId++).padStart(4,'0')}`, ...req.body, status: 'pending', createdAt: new Date() };
  orders.push(order);
  res.status(201).json(order);
};

exports.getUserOrders = (req, res) => {
  const userOrders = orders.filter(o => o.userId === req.params.userId);
  res.json(userOrders);
};

exports.getOrderById = (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
};

exports.updateOrderStatus = (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.status = req.body.status;
  res.json(order);
};
