// Serverless function for products API
const products = [
  {
    "id": "1",
    "name": "Elegant Summer Dress",
    "brand": "Lorena",
    "price": 15000,
    "stock": 25,
    "preview": "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
    "photos": ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400"],
    "description": "Beautiful summer dress perfect for any occasion",
    "isAccessory": false,
    "category": "clothing"
  },
  {
    "id": "2", 
    "name": "Designer Handbag",
    "brand": "Lorena",
    "price": 25000,
    "stock": 15,
    "preview": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    "photos": ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"],
    "description": "Luxury handbag with premium materials",
    "isAccessory": true,
    "category": "bags"
  },
  {
    "id": "3",
    "name": "Gold Watch",
    "brand": "Lorena",
    "price": 45000,
    "stock": 10,
    "preview": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    "photos": ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"],
    "description": "Luxury gold watch with premium finish",
    "isAccessory": true,
    "category": "watches"
  }
];

let orders = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case 'GET':
      if (id) {
        const product = products.find(p => p.id === id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        return res.json(product);
      }
      return res.json(products);

    case 'POST':
      const newProduct = { ...req.body, id: Date.now().toString() };
      products.push(newProduct);
      return res.status(201).json(newProduct);

    case 'PUT':
      if (!id) return res.status(400).json({ error: 'Product ID required' });
      const idx = products.findIndex(p => p.id === id);
      if (idx === -1) return res.status(404).json({ error: 'Product not found' });
      
      products[idx] = { ...products[idx], ...req.body, id };
      return res.json(products[idx]);

    case 'DELETE':
      if (!id) return res.status(400).json({ error: 'Product ID required' });
      const productIdx = products.findIndex(p => p.id === id);
      if (productIdx !== -1) {
        products.splice(productIdx, 1);
      }
      return res.status(204).end();

    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}