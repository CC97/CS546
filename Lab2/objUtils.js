function checkEmpty(obj){
    var a = Object.getOwnPropertyNames(obj);
    if (a.length == 0) throw 'the object is empty!';
}

const computeObjects = function computeObjects(arr,func){
    if (arguments.length != 2) throw 'it must be one array and one function!';
    if (Array.isArray(arr) != true || arr.length < 1) throw 'it must be one array and one function!';
    var result={};
    for(let i in arr)
    {
        checkEmpty(arr[i]);
        for (let key in arr[i])
        {
            if (typeof arr[i][key] != 'number') throw 'it must be the number!';
            if (result.hasOwnProperty(key))
                result[key] += func(arr[i][key]);
            else
                result[key] = func(arr[i][key]);
        }
    }

    return result;
}


const commonKeys = function commonKeys(obj1,obj2){
    if (arguments.length != 2) throw 'it must be two objects!';
    if (typeof obj1 != 'object' || Array.isArray(obj1) == true) throw 'it must be two objects!';
    if (typeof obj2 != 'object' || Array.isArray(obj2) == true) throw 'it must be two objects!';

    var result = {};
    for(let key in obj1)
    {
        if (Array.isArray(obj1[key]))
        {
            if (obj2.hasOwnProperty(key) && Array.isArray(obj2[key]) == true)
            {
                obj1[key].sort();
                obj2[key].sort();
                var same = 0;
                for (let i in obj1[key])
                {
                    if (obj1[key][i] != obj2[key][i])
                    {
                        same = 1;
                        break;
                    }
                    
                }
                if (same == 0)
                {
                    result[key] = obj1[key];
                }
            }
        }
        else if (typeof obj1[key] == 'object')
        {
            if (obj2.hasOwnProperty(key) && typeof obj2[key] == 'object' && Array.isArray(obj2[key]) != true)
            {
                let arr1 = Object.getOwnPropertyNames(obj1[key]);
                let arr2 = Object.getOwnPropertyNames(obj2[key]);
                if (arr1.length != 0 && arr2.length != 0)
                {
                    var arr = commonKeys(obj1[key],obj2[key]);
                    for (let key1 in arr)
                    {
                        result[key1] = arr[key1];
                    }
                }
                else
                    result[key] = {};
            }
        }
        else
        {
            if (obj2.hasOwnProperty(key) && obj1[key] == obj2[key])
            {
                result[key] = obj1[key];
            }
        }
    }
    return result;
}


function ifEmptyObj(obj){
    for (let key in obj)
    {
      return false;
    }
    return true;
  }

const flipObject = function flipObject(object){
    if (arguments.length != 1) throw 'it must be one object!';
    if (Object.prototype.toString.call(object) !== '[object Object]') throw "input parameter must be an object"

    var result = {}
    for (let key in object){
        if (Object.prototype.toString.call(object[key]) === '[object Object]')
        {
            if(ifEmptyObj(object[key]))
            {
                result[key] = object[key];
            }
            else
            {
                result[key] = flipObject(object[key]);
            }
        }
        else if (Array.isArray(object[key]) == true)
        {
            for (let i in object[key])
            {
                result[object[key][i]] = key;
            }
        }
        else
        {
            result[object[key]] = key;
        }
    }
    return result;
}

module.exports = {
    firstName: "Cheng", 
    lastName: "Chen", 
    studentId: "10473438",
    computeObjects,
    commonKeys,
    flipObject
};