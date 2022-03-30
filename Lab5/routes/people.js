const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData = data.people;

router.get('/:id', async (req, res) => {
  try {
    const people = await peopleData.getPersonById(req.params.id);
    res.json(people);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

router.get('/', async (req, res) => {
  try {
    const peopleList = await peopleData.getPeople();
    res.json(peopleList);
  } catch (e) {
    // Something went wrong with the server!
    res.status(500).send();
  }
});

module.exports = router;