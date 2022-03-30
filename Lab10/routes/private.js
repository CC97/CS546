const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('home', {document_title: 'private', username: req.session.user.username})
})

module.exports = router;