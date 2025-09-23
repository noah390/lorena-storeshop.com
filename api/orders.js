// Serverless function for orders API
let orders = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case 'GET':
      if (id) {
        const order = orders.find(o => o.id === id);
        if (!order) return res.status(404).json({ error: 'Order not found' });
        return res.json(order);
      }
      return res.json(orders);

    case 'POST':
      try {
        const orderData = req.body;
        
        let totalAmount = 0;
        const orderItems = [];
        
        Object.keys(orderData.items).forEach(productId => {
          const quantity = orderData.items[productId];
          const price = 15000; // Default price
          const itemTotal = price * quantity;
          totalAmount += itemTotal;
          orderItems.push({
            id: productId,
            name: `Product ${productId}`,
            price: price,
            quantity: quantity,
            total: itemTotal,
            image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400'
          });
        });
        
        const newOrder = {
          id: Date.now().toString(),
          orderNumber: orderData.orderNumber || 'LOR' + Date.now(),
          customer: orderData.customer,
          items: orderItems,
          totalAmount: totalAmount,
          orderDate: new Date().toISOString(),
          status: 'pending'
        };
        
        orders.push(newOrder);
        return res.status(201).json(newOrder);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to create order' });
      }

    case 'PATCH':
      if (req.url.includes('/status')) {
        const orderId = req.url.split('/')[2];
        const orderIdx = orders.findIndex(o => o.id === orderId);
        if (orderIdx === -1) return res.status(404).json({ error: 'Order not found' });
        
        const { status } = req.body;
        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        
        if (!validStatuses.includes(status)) {
          return res.status(400).json({ error: 'Invalid status' });
        }
        
        orders[orderIdx].status = status;
        orders[orderIdx].updatedAt = new Date().toISOString();
        return res.json({ message: 'Order status updated', order: orders[orderIdx] });
      }
      break;

    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}