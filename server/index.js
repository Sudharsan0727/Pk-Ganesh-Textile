const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const dotenv = require('dotenv');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Image Upload Route
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Basic Route
app.get('/', (req, res) => {
  res.send('P.K. Ganesh Textile API is running...');
});

// Auth Routes (To be implemented)
// app.use('/api/auth', authRoutes);

// Product Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { id: 'asc' }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { category: true }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { name, brand, price, image, categoryId, subCategory } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        brand: brand || undefined,
        price: price || undefined,
        image,
        categoryId: parseInt(categoryId),
        subCategory: subCategory || undefined
      }
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, price, image, categoryId, subCategory } = req.body;
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        brand,
        price,
        image,
        categoryId: parseInt(categoryId),
        subCategory
      }
    });
    res.json(product);
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Category Routes
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { id: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const { name, image } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const category = await prisma.category.create({
      data: { name, slug, image }
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name, slug, image }
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
