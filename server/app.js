import express from 'express';
import { middlewares } from './middlewares.js'; // Adjust the path if necessary
import publicRoutes from './publicRoutes.js'; // Adjust the path as necessary
import privateRoutes from './privateRoutes.js'; // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 3000; 

// Debug GET endpoint
app.get('/debug', (req, res) => {
    const debug = `Debug endpoint received the request`;
    console.log(debug);
    res.status(200).json({ message: debug });
});
// Use all middlewares except errorHandler
middlewares.slice(1).forEach(middleware => app.use(middleware));

app.use('/', publicRoutes);
app.use('/', privateRoutes);

// Add error handling middleware at the end
app.use(middlewares[0]); // Assuming the first middleware is the error handler

// Debug POST endpoint
app.post('/debug', (req, res) => {
  const debugMsg = `Debug endpoint received the data,`;
  const debugVal = JSON.stringify(req.body);
    console.log(debugMsg,debugVal);
  res.status(200).json({ message: `${debugMsg} ${debugVal}` }); //needs touch up
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
