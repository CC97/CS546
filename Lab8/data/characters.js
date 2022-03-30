const axios = require("axios")
const md5 = require('blueimp-md5');

const publickey = '53ca025cb037ad20d1935a2917b11a76';
const privatekey = '9ba451aab6552c5802e10581eea9e856f0cec77b';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

const getByName = async function getByName(searchTerm){
    searchTerm = searchTerm.trim()
    if (searchTerm == '') throw 'Please input a valid content'
    const { data } = await axios.get(url+'&nameStartsWith=' + searchTerm)
    if (typeof data == 'undefined') throw 'the data is error'
    return data
    }
const getById = async function getById(ID){
    ID = ID.trim()
    if(ID == '') throw 'Please input a valid ID'
    const { data } = await axios.get(baseUrl + '/' + ID + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash)
    if (typeof data == 'undefined') throw 'the data is error'
    if(data.message) throw 'This ID did not find'
    return data
}


module.exports = {
    getById,
    getByName
}




 
  


