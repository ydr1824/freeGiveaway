import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createItem, findAllItems, updateItemImage, findItemById, updateItemStatus } from '../models/items.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Directory for uploaded images

// Serve static files from the uploads directory
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Get all items
router.get('/', async (req, res) => {
  try {
    const itemList = await findAllItems();
    res.json(itemList);
    console.log(itemList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get item by ID
router.get('/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await findItemById(itemId); // Ensure this function is defined in your model
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new item
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const item = await createItem(req.body);
    console.log(item);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    console.log(req.body)
    const item = await updateItemStatus(itemId,req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Upload an image for an item
router.post('/upload/:id', upload.single('image'), async (req, res) => {
  const itemId = req.params.id;
  const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`; // Create the image URL

  try {
    const updatedItem = await updateItemImage(itemId, imageUrl); // Ensure this function is defined in your model
    res.json({ message: 'Image uploaded successfully', updatedItem });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



export default router;
