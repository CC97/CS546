function checkArrays(arrays){
    if (typeof arrays != 'object' && typeof arrays != 'number' || arrays.length < 1) throw 'it must be the number!';
   
}

function checkElement(arrays){
    for(let i = 0; i < arrays.length; i++)
    {
        if (typeof arrays[i] != 'object' && typeof arrays[i] != 'number') throw 'it must be the number!';

        if (arrays[i] < 1) 
        {
            throw 'it must be the number!';
        }
        else 
        {
            for (let j = 0; j < arrays[i].length; j++)
            {
                if (typeof arrays[i][j] != 'number') throw 'it must be the number!';
            }
        }
    }
}

const average = function average(arrays){
    if(arguments.length != 1 || Array.isArray(arrays) != true || arrays.length < 1) throw 'it must be one array!';
    for (let i in arrays)
    {
        if (Array.isArray(arrays[i]) == true && arrays[i].length >= 1)
        {
            for (let j in arrays[i])
            {
                if (typeof arrays[i][j] != 'number') throw 'it must be the number!';
            }
        }
        else throw 'content is not valid!';

    }

    var sum = 0;
    var index = 0;
    for (let i = 0; i < arrays.length; i++)
    {
        if (typeof arrays[i] == 'number')
        {
            sum += arrays[i];
            index++;
        }
        else
        {
            for (let j = 0; j < arrays[i].length; j++)
            {
                sum += arrays[i][j];
                index++;
            }
        }
    }
    var result = Math.round(sum/index);
    return result;
}



const modeSquared = function modeSquared(array){
    if(arguments.length != 1) throw 'it must be one array!';

    checkArrays(array);
    checkElement(array);

    var time = {};

    for (let i = 0; i < array.length; i++)
    {
        if(typeof array[i] == 'number')
        {
            if (time.hasOwnProperty(array[i]))
                time[array[i]]++;
            else
                time[array[i]] = 1;
        }
        else
        {
            for (let j = 0; j < array.length; j++)
            {
                if (time.hasOwnProperty(array[i][j]))
                time[array[i][j]]++;
            else
                time[array[i][j]] = 1;
            }
        }
    }
    var max = 0;
        var result = 0;

        for (let key in time)
        {
            if(time[key] > max)
                max = time[key];
        }

        for (let key in time)
        {
            if(time[key] == max)
                result += key*key;
        }
        
        return result;
}

const medianElement = function medianElement(array){
    if(arguments.length != 1) throw 'it must be one array!';

    checkArrays(array);
    checkElement(array);

    var result = {};

    if(array.length == 1)
    {
        result[0] = 0;
    }
    else if (array.length % 2 != 0)
    {
        let index = (array.length -1) / 2;
        result[array[index]] = index;
    }
    else
    {
        let index = array.length / 2;
        let median = (array[index - 1] + array[index]) / 2;

        result[median] = index;
    }
    return result;
}

const merge = function merge(arrayOne, arrayTwo){
    if(arguments.length != 2) throw 'it must be two array!';

    checkArrays(arrayOne);
    checkArrays(arrayTwo);

    var arrayMerge = arrayOne.concat(arrayTwo);
    
    var num = new Array();
    var lowerCase = new Array();
    var upperCase = new Array();

    for (let i = 0; i < arrayMerge.length; i++)
    {
        if (typeof arrayMerge[i] == 'number')
            num.push(arrayMerge[i]);
        else if (typeof arrayMerge[i] == 'string')
        {
            if (arrayMerge[i].length != 1) throw 'The context is invalid!'
            if (arrayMerge[i].charCodeAt() >= 97 && arrayMerge[i].charCodeAt() <=122)
                lowerCase.push(arrayMerge[i]);
            if (arrayMerge[i].charCodeAt() >= 65 && arrayMerge[i].charCodeAt() <=90)
                upperCase.push(arrayMerge[i]);
        }
        else throw 'The context is invalid!';
    }

    num.sort(
        function(a, b){
            return a - b;
        }
    );
    lowerCase.sort();
    upperCase.sort();

    var result = lowerCase.concat(upperCase,num);
    return result;

}



module.exports = {
    firstName: "Cheng", 
    lastName: "Chen", 
    studentId: "10473438",
    average,
    modeSquared,
    medianElement,
    merge
};