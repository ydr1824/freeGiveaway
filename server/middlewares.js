import express from 'express';
const inTesting = true;
// Logger Middleware
function logger(req, res, next) {
    if (inTesting) {
        return next();
    }
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
}

// Authentication Middleware

function authenticate(req, res, next) {
    if (inTesting) {
        return next();
    }
    const token = req.headers['authorization'];
    if (token) {

        if (token === 'valid-token') {
            next(); // User is authenticated
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}


// Error Handling Middleware
function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log the error stack
    res.status(500).json({ message: 'Internal Server Error' }); // Send error response
}

// Request Time Middleware

function requestTime(req, res, next) {
    if (inTesting) {
        return next();
    }
    req.requestTime = Date.now();
    next();
}


const corsMiddleware = (req, res, next) => {
    // Allow all origins or specify a particular one
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
};

const jsonMiddleware = express.json();

// Order of middlewares: 
// 1. Logger
// 2. Request Time
// 3. JSON Parser
// 4. CORS
// 5. Authentication
// 6. Error Handler
const middlewares = [errorHandler, logger, requestTime, jsonMiddleware, corsMiddleware, authenticate];

export default middlewares; // Use ES module export
