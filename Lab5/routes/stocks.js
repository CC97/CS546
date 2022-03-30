const express = require('express');
const router = express.Router();
const data = require('../data');
const stocksData = data.stocks;

router.get('/:id', async (req, res) => {
  try {
    const stocks = await stocksData.getStockById(req.params.id);
    res.json(stocks);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

router.get('/', async (req, res) => {
  try {
    const stocksList = await stocksData.getStocks();
    res.json(stocksList);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;