import express from 'express';
import userRoutes from './routes/users.js';
import categoryRoutes from './routes/categories.js';
import conditionRoutes from './routes/conditions.js';
import itemRoutes from './routes/items.js';
import requestRoutes from './routes/requests.js';
import messageRoutes from './routes/messages.js';
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/conditions', conditionRoutes);
app.use('/items', itemRoutes);
app.use('/requests', requestRoutes);
app.use('/messages', messageRoutes);

app.post('/debug', (req, res) => {
  console.log('Received request body:', JSON.stringify(req.body));
  res.status(200).json({ message: `Debug endpoint received the data ${JSON.stringify(req.body)}` });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
