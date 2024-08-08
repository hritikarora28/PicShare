const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://hritikarora875:eQl5M0RMkwt3xP5J@cluster0.vwss2yc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// Use method override to support DELETE and PUT methods with forms
app.use(methodOverride('_method'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Routes
const indexRoute = require('./routes/index');
const uploadRoute = require('./routes/upload');
app.use('/', indexRoute);
app.use('/upload', uploadRoute);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
