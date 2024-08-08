const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const Photo = require('../models/photo');

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Render upload form
router.get('/', (req, res) => {
    res.render('upload', { errors: [] });  // Pass an empty errors array
});

// Handle form submissions
router.post('/', upload.single('photo'), [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ max: 100 }).withMessage('Title must be less than 100 characters'),
    body('description')
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
    body('photo')
        .custom((value, { req }) => {
            if (!req.file) {
                throw new Error('Photo is required');
            }
            return true;
        })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('upload', { errors: errors.array() });
    }

    const { title, description } = req.body;
    const newPhoto = new Photo({
        title,
        description,
        imagePath: '/images/' + req.file.filename
    });
    await newPhoto.save();

    res.redirect('/');
});

module.exports = router;

