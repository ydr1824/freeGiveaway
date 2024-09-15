import express from 'express';
import middlewares from './middlewares.js'; // Adjust the path if necessary
import routes from './routes.js'; // Import the routes

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
// Use the routes defined in routes.js
app.use(routes); 
// Add error handling middleware at the end
app.use(middlewares[0]); // Assuming the first middleware is the error handler

// Debug POST endpoint
app.post('/debug', (req, res) => {
    console.log('Received request body:', JSON.stringify(req.body));
    res.status(200).json({ message: `Debug endpoint received the data ${JSON.stringify(req.body)}` });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
