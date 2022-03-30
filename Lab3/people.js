const axios = require("axios")

async function getPeople(){
  const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
  if (typeof data == 'undefined') throw 'the data is error'
  return data 
}

const isEmpty = function isEmpty(a){
  if (a.length == 0 || a.trim().length == 0) throw 'content is not valid';
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


const sameStreet = async function sameStreet(streetName, streetSuffix){
  if (arguments.length != 2 || typeof streetName != 'string' || typeof streetSuffix != 'string') throw 'content is not valid';
  isEmpty(streetName);
  isEmpty(streetSuffix);
  streetName = streetName.toLowerCase();
  streetSuffix = streetSuffix.toLowerCase();

  var data = []
  data = await getPeople();
  let dataLength = data.length;
  var result = []
  for(let i = 0; i < dataLength; i++)
  {
    let homeStreetName = data[i]['address']['home']['street_name'];
    let homeStreetSuffix = data[i]['address']['home']['street_suffix'];
    let workStreetName = data[i]['address']['work']['street_name'];
    let workStreetSuffix = data[i]['address']['work']['street_suffix'];
    homeStreetName = homeStreetName.toLowerCase();
    homeStreetSuffix = homeStreetSuffix.toLowerCase();
    workStreetName = workStreetName.toLowerCase();
    workStreetSuffix = workStreetSuffix.toLowerCase();

    if((homeStreetName == streetName && homeStreetSuffix == streetSuffix) || (workStreetName == streetName && workStreetSuffix == streetSuffix))
      result.push(data[i]);
  }
  if(result.length >= 2) 
    return result;
  else
    throw 'less than 2 people living in this street';
}


const manipulateSsn = async function manipulateSsn(){
  if (arguments.length != 0) throw 'content is not valid';
  var data = []
  data = await getPeople();

  var ssn = {
    max: 0,
    min: 0,
    maxIdx: 0,
    minIdx: 0,
    sum: 0
  }
  dataLength = data.length;
  for (let i = 0; i < dataLength; i++)
  {
    let a = data[i]['ssn'];
    a = a.replace(/-/g,'');
    a = a.split('');
    a.sort()
    a = a.join('')
    a = parseInt(a);
    if(a > ssn['max'])
    {
      ssn['max'] = a;
      ssn['maxIdx'] = i;
    }
    if(a < ssn['min'])
    {
      ssn['min'] = a;
      ssn['minIdx'] = i;
    }
    ssn['sum'] += a;
  }

  var result = {
    highest: { firstName: data[ssn['maxIdx']]['first_name'],    lastName: data[ssn['maxIdx']]['last_name']},
    lowest: { firstName: data[ssn['minIdx']]['first_name'],    lastName: data[ssn['minIdx']]['last_name']},
    average: Math.floor(ssn['sum'] / dataLength)
  }
  return result
}


const sameBirthday = async function sameBirthday(month,day){
  if (arguments.length != 2 || (typeof month != 'string' && typeof month != 'number') || (typeof day != 'string' && typeof day != 'number')) throw 'content is not valid';
  
  month = parseInt(month);
  
  day = parseInt(day);
  if(month > 12 || month < 1) throw 'date is not valid';
  var bigMonth = [1,3,5,7,8,10,12]
  if(month in bigMonth)
  {
    if(day > 31 || day < 1) throw 'date is not valid';
  }  
  if (month == 2)
    {if(day >28 || day < 1) throw 'date is not valid';}
  else
    {if(day > 30 || day < 1) throw 'date is not valid';}

  var data = []
  data = await getPeople();
  var dataLength = data.length;

  var result = [];
  for (let i = 0; i < dataLength; i++)
  {
    let birthday = data[i]['date_of_birth'].split('/');
    if(birthday[0] == month && birthday[1] == day)
      result.push(data[i]['first_name'] + ' ' + data[i]['last_name'])
  }
  if(result.length < 1) 
    throw 'there are no people with that birthday'
  else
    return result;
}



module.exports = {
  firstName: "Cheng", 
  lastName: "Chen", 
  studentId: "10473438",
  getPeople,
  getPersonById,
  sameStreet,
  manipulateSsn,
  sameBirthday
};


