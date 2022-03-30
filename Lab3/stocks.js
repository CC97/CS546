const axios = require("axios");
const people = require("./people");

async function getStocks(){
  const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
  if (typeof data == 'undefined') throw 'the data is error'
  return data 
}
async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json') 
    if (typeof data == 'undefined') throw 'the data is error'
    return data 
  }

const isEmpty = function isEmpty(a){
    if (a.length == 0 || a.trim().length == 0) throw 'content is not valid';
}

const listShareholders = async function listShareholders(){
    if (arguments.length != 0) throw 'content is valid';
    var stocks = [];
    stocks = await getStocks();
    person = await getPeople();

    var personLength = person.length;
    var stocksLength = stocks.length;
    function findperson(id){
        for(let i = 0; i < personLength; i++)
        {
        if(id == person[i]['id'])
            return person[i]
        if(i == personLength - 1) 
            return 0;
        }
    }
    for(let i = 0; i < stocksLength; i++)
    {
        let holderLength = stocks[i]['shareholders'].length
        if(holderLength > 0)
        {
            for(let j = 0; j < holderLength; j++)
            {
                let id = new String();
                id = stocks[i]['shareholders'][j]['userId'];
                let person = {}
                person = findperson(id);
                if(person == 0)
                    continue;
                var info = {}
                info['first_name'] = person['first_name'];
                info['last_name'] = person['last_name'];
                info['number_of_shares'] = stocks[i]['shareholders'][j]['number_of_shares'];
                stocks[i]['shareholders'][j] = info;
            }
        }
    }
    return stocks;
}



const topShareholder = async function topShareholder(stockName){
    if (arguments.length != 1 || typeof stockName != 'string') throw 'content is not valid';
    isEmpty(stockName);

    var stocks = await listShareholders();

    var stocksLength = stocks.length;
    for(let i = 0; i < stocksLength; i++)
    {
        if(stocks[i]['stock_name'] == stockName)
        {
            let shareholders = stocks[i]['shareholders'];
            let length = shareholders.length
            if(length > 0)
            {
                let max = 0;
                let maxIdx = 0;
                for(let j = 0; j < length; j++)
                {
                    if(shareholders[j]['number_of_shares'] > max)
                    {
                        max = shareholders[j]['number_of_shares'];
                        maxIdx = j;
                    }
                }
                var result = 'with '+max+' shares in '+stockName+', '+stocks[i]['shareholders'][maxIdx]['first_name']+' '+stocks[i]['shareholders'][maxIdx]['last_name']+' is the top shareholder.'
                return result
            }
            else
                return stockName+' currently has no shareholders.'
        }
        if(i == stocksLength-1) throw 'stock name can not be found'
    }
}



const listStocks = async function listStocks(firstName,lastName){
    if (arguments.length != 2 || typeof firstName != 'string' || typeof firstName != 'string') throw 'content is valid';
    isEmpty(firstName);
    isEmpty(lastName);

    var stocks = await getStocks();
    var person = await getPeople();

    stocksLength = stocks.length;
    personLength = person.length;

    var id = new String();
    for(let i = 0; i < personLength; i++)
    {
        if(person[i]['first_name'] == firstName && person[i]['last_name'] == lastName)
        {
            id = person[i]['id'];
            break;
        }    
        if (i == personLength - 1) throw 'person is not find'
    }
    var listStocks = [];
    for(let j = 0; j < stocksLength; j++)
    {
        let holderLength = stocks[j]['shareholders'].length;
        if(holderLength > 0)
        {
            let shareholders = stocks[j]['shareholders'];
            for(let x = 0; x < holderLength; x++)
            {
                if(shareholders[x]['userId'] == id)
                {
                    let addStocks = {};
                    addStocks['stock_name'] = stocks[j]['stock_name'];
                    addStocks['number_of_shares'] = shareholders[x]['number_of_shares'];
                    listStocks.push(addStocks);
                }
            }
        }
    }
    if(listStocks.length > 0)
        return listStocks;
    else
        throw 'this person do not have stocks'
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
    getPeople,
    getStocks,
    listShareholders,
    topShareholder,
    listStocks,
    getStockById
  };
