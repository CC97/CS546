const axios = require("axios");
const people = require("./people");

const isEmpty = function isEmpty(a){
    if (a.length == 0 || a.trim().length == 0) throw 'content is not valid';
}

async function getStocks(){
  const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
  if (typeof data == 'undefined') throw 'the data is error'
  return data 
}

const getStockById = async function getStockById(id){
    if (arguments.length != 1 || typeof id != 'string') throw 'content is valid';
    isEmpty(id);

    var stocks = await getStocks();
    var stocksLength = stocks.length;

    for(let i = 0; i < stocksLength; i++)
    {
        if(stocks[i]['id'] == id)
            return stocks[i]
        if(i == stocksLength-1) throw 'the stock can not be found'
    }
}

module.exports = {
    firstName: "Cheng", 
    lastName: "Chen", 
    studentId: "10473438",
    getStocks,
    getStockById
  };
