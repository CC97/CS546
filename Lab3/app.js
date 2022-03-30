const people = require("./people");
const stocks = require("./stocks");

async function main(){
    try{
        const peopledata = await people.getPeople();
        console.dir(peopledata,{depth:null});
    }catch(e){
        console.log (e);
    }
    try{
        const stocksdata = await stocks.getStocks();
        console.dir(stocksdata,{depth:null});
    }catch(e){
        console.log (e);
    }
}

async function getPersonById(){
    //getPersonById
    try {
        // Should Pass
        const getPersonByIdOne =await people.getPersonById('7989fa5e-8f3f-458d-ad58-23c8d9ef5a10');
        console.dir(getPersonByIdOne,{depth:null});
    } catch (e) {
        console.log('getPersonById failed test case');
    }
    try {
        // Should Fail
        const getPersonByIdTwo =await people.getPersonById('');
        console.dir(getPersonByIdTwo,{depth:null});
    } catch (e) {
        console.log(e);
    }
}

async function sameStreet(){
    //sameStreet
    try {
        // Should Pass
        const sameStreetOne =await people.sameStreet("Sutherland", "Point");
        console.dir(sameStreetOne,{depth:null});
    } catch (e) {
        console.log(e);
    }
    try {
        // Should Fail
        const sameStreetTwo =await people.sameStreet('');
        console.dir(sameStreetTwo,{depth:null});
    } catch (e) {
        console.log(e);
    }
}
    
async function manipulateSsn(){
    //manipulateSsn
    try {
        // Should Pass
        const manipulateSsnOne =await people.manipulateSsn();
        console.dir(manipulateSsnOne,{depth:null});
    } catch (e) {
        console.log(e);
    }
    try {
        // Should Fail
        const manipulateSsnTwo =await people.manipulateSsn('123');
        console.dir(manipulateSsnTwo,{depth:null});
    } catch (e) {
        console.log(e);
    }
}
    
async function sameBirthday(){
    //sameBirthday
    try {
        // Should Pass
        const sameBirthdayOne =await people.sameBirthday(09, 25);
        console.dir(sameBirthdayOne,{depth:null});
    } catch (e) {
        console.log(e);
    }
    try {
        // Should Fail
        const sameBirthdayTwo =await people.sameBirthday('');
        console.dir(sameBirthdayTwo,{depth:null});
    } catch (e) {
        console.log(e);
    }
}

async function listShareholders(){
    //listShareholders
    try {
        // Should Pass
        const listShareholdersOne =await stocks.listShareholders();
        console.dir(listShareholdersOne,{depth:null});
    } catch (e) {
        console.log(e);
    }
    try {
        // Should Fail
        const listShareholdersTwo =await stocks.listShareholders('');
        console.dir(listShareholdersTwo,{depth:null});
    } catch (e) {
        console.log(e);
    }
}

async function topShareholder(){
    //topShareholder
    try {
        // Should Pass
        const topShareholderOne =await stocks.topShareholder("Aeglea BioTherapeutics, Inc.");
        console.dir(topShareholderOne,{depth:null});
    } catch (e) {
        console.log(e);
    }
    try {
        // Should Fail
        const topShareholderTwo =await stocks.topShareholder('');
        console.dir(topShareholderTwo,{depth:null});
    } catch (e) {
        console.log(e);
    }
}

async function listStocks(){
    //listStocks
    try {
        // Should Pass
        const listStocksOne =await stocks.listStocks("Grenville", "Pawelke");
        console.dir(listStocksOne,{depth:null});
    } catch (e) {
        console.log(e);
    }
    try {
        // Should Fail
        const listStocksTwo =await stocks.listStocks('');
        console.dir(listStocksTwo,{depth:null});
    } catch (e) {
        console.log(e);
    }
}

async function getStockById(){
    //getStockById
    try {
        // Should Pass
        const getStockByIdOne =await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0");
        console.dir(getStockByIdOne,{depth:null});
    } catch (e) {
        console.log(e);
    }
    try {
        // Should Fail
        const getStockByIdTwo =await stocks.getStockById('');
        console.dir(getStockByIdTwo,{depth:null});
    } catch (e) {
        console.log(e);
    }
}

main();
getPersonById();
sameStreet();
manipulateSsn();
sameBirthday();
listShareholders();
topShareholder();
listStocks();
getStockById();