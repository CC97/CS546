const express = require('express');
const router = express.Router();
const data = require('../data');
const charactersData = data.characters;

router.get('/:id', async (req, res) => {
    try {
        if(req.params.id.trim() == '') throw 'Please input a valid message'
        const characters = await charactersData.getById(req.params.id);
        res.render('single', { document_title: characters.data.results[0].name, hero: characters.data.results})
    } catch (e) {
        res.status(404).render('error', {document_title: 'Character Finder', message: 'ID not found'});
    }
    
});

module.exports = router;