// Load environment variables
require('dotenv').config();

// Import required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { connectMongoose } = require('./app/db'); // Assuming this is where connectMongoose is defined
const router = require('./routes/routes');

// Initialize Express app
const app = express();

// Configure view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB using Mongoose
connectMongoose();

// Serve static assets from the 'assets' directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Parse URL-encoded and JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Setup routes
app.use(router);

// Define the port to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
});
