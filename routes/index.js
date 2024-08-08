const express = require('express');
const router = express.Router();
const Photo = require('../models/photo');

// Fetch and display paginated photos
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 12; // Number of photos per page

    const photos = await Photo.find({})
        .skip((page - 1) * limit)
        .limit(limit);

    const totalPhotos = await Photo.countDocuments({});
    const totalPages = Math.ceil(totalPhotos / limit);

    res.render('index', {
        photos,
        currentPage: page,
        totalPages
    });
});

// Delete photo
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Photo.findByIdAndDelete(id);
    res.redirect('/');
});

module.exports = router;
