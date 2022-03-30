const axios = require("axios")

const isEmpty = function isEmpty(a){
    if (a.length == 0 || a.trim().length == 0) throw 'content is not valid';
  }

async function getPeople(){
  const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
  if (typeof data == 'undefined') throw 'the data is error'
  return data 
}

const getPersonById = async function getPersonById(id){
  if (arguments.length != 1 || typeof id != 'string') throw 'content is valid';
  isEmpty(id);
  var data = []
  data = await getPeople();
  
  var dataLength = data.length;
  for(let i = 0; i < dataLength; i++)
  {
      if(id == data[i]['id'])
          return data[i]
      if(i == dataLength - 1) throw 'person not found';
  }
}


module.exports = {
  firstName: "Cheng", 
  lastName: "Chen", 
  studentId: "10473438",
  getPeople,
  getPersonById
};


