// middlewares.js
import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser'; // Import cookie-parser
import bcrypt from 'bcryptjs';

const JWT_SECRET = 'FreeGA'; // Replace with a secure secret
const inTesting = true;

// Password Hashing Functions
async function hashPW(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

async function checkPW(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}
function signJWT(email) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    return token;
}
function verifyJWT(token) {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
}

// Logger Middleware
function logger(req, res, next) {
    if (inTesting) {
        return next();
    }
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
}

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token; // Get token from cookies

    if (!token) {
        return res.sendStatus(403); // Forbidden
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user; // Save user info in request
        next();
    });
};


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
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'null',
    // Add more origins as necessary
];
// CORS Middleware
const corsMiddleware = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        console.log(origin , "allowed")
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        console.log(origin , "not allowed")
    }
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
};

const jsonMiddleware = express.json();
const CookieParser = cookieParser();

// Order of middlewares: 
const middlewares = [logger, requestTime, jsonMiddleware, corsMiddleware, CookieParser, errorHandler];

export { middlewares, hashPW, checkPW, signJWT, verifyJWT, bcrypt,authenticateJWT }; // Export middlewares and utility functions
