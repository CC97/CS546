
const express = require('express');
const router = express.Router();
const data = require('../data');
const charactersData = data.characters;

router.post('/', async (req, res) => {
    try {
        const characters = await charactersData.getByName(req.body.searchTerm);
        res.render('results', { document_title: 'Characters Finder', characters: characters.data.results, searchTerm: req.body.searchTerm})
    } catch (e) {
        res.status(400).render('error', {message: e, document_title: 'Character Finder', searchTerm: req.body.searchTerm})
    }
    
});

module.exports = router;