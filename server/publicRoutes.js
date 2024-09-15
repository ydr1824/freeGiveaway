import express from 'express';
import conditionRoutes from './routes/conditions.js'; // Adjust the path as necessary
import itemRoutes from './routes/items.js'; // Adjust the path as necessary
import categoryRoutes from './routes/categories.js'; // Adjust the path as necessary
import registerRoutes from './routes/register.js'; // Adjust the path as necessary

const publicRouter = express.Router();

// Define public routes
publicRouter.use('/conditions', conditionRoutes);
publicRouter.use('/items', itemRoutes);
publicRouter.use('/categories', categoryRoutes);
publicRouter.use('/register', registerRoutes);
publicRouter.get('/debugRoute', (req, res) => {
    res.json({ message: 'Debug route is working', timestamp: new Date() });
  });
// Export the public router
export default publicRouter;
