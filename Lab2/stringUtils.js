const sortString = function sortString(string){
    if (arguments.length != 1) throw 'it must be one string!';
    if (typeof string != 'string') throw 'it must be one string!';
    if (string.length < 1) throw 'it must be one string!';

    var stringArray = string.split('');
    var char = new Array();
    var specialChar = new Array();
    var number = new Array();
    var space = new Array();

    for (let i = 0; i < stringArray.length; i++)
    {
        if ((stringArray[i].charCodeAt() >= 65 && stringArray[i].charCodeAt() <= 90) || (stringArray[i].charCodeAt() >= 97 && stringArray.charCodeAt() <=122))
            char.push(stringArray[i]);
        if ((stringArray[i].charCodeAt() >= 33 && stringArray[i].charCodeAt() <= 47) || (stringArray[i].charCodeAt() >= 58 && stringArray[i].charCodeAt() <= 64) || (stringArray[i].charCodeAt() >= 91 && stringArray[i].charCodeAt() <= 96) || (stringArray[i].charCodeAt() >= 123 && stringArray[i].charCodeAt() <= 126))
            specialChar.push(stringArray[i]);
        if (stringArray[i].charCodeAt() >= 48 && stringArray[i].charCodeAt() <= 57)
            number.push(stringArray[i]);
        if (stringArray[i].charCodeAt() == 32)
            space.push(stringArray[i]);
    }
    char.sort();
    specialChar.sort();
    number.sort();
    
    var mix = char.concat(specialChar,number,space);
    var result = mix.join('');
    return result;
}

const replaceChar = function replaceChar(string, idx){
    if (arguments.length != 2 || typeof string != 'string' || typeof idx != 'number') throw 'it must be one string and one index!';
    if (idx == 0 || idx > string.length - 2) throw 'index is not valid!';
    
    var stringArr = string.split('');
    var before = stringArr[idx-1];
    var after = stringArr[idx+1];
    var aim = stringArr[idx]

    var time = 1;
    for (let i = 0; i < stringArr.length; i++)
    {
        if (i == idx)
        {
            continue; 
        }
        else
        {
            if (stringArr[i] == stringArr[idx])
            {
                if(time % 2 != 0)
                {
                    stringArr[i] = before;
                    time++;
                }
                else
                {
                    stringArr[i] = after;
                    time++
                }
            }
        }
    }
    var result = stringArr.join('');
    return result;
}


const mashUp = function mashUp(string1, string2, char){
    if (arguments.length != 3) throw 'content is not valid!';
    if (typeof string1 != 'string' || typeof string2 != 'string' || typeof char != 'string' || char.length > 1 || char.charCodeAt() == 32) throw 'content is not valid!';

    function checkSpace(str){
        let check = str.split('');
        for (let i = 0; i < str.length; i++)
        {
            if (check[i].charCodeAt() != 32)
                return;
        }
        throw 'content is not valid!';
    }
    checkSpace(string1);
    checkSpace(string2);

    var strArr1 = string1.split('');
    var strArr2 = string2.split('');

    if (strArr1.length > strArr2.length)
    {
        let time = strArr1.length - strArr2.length;
        for (let j = 0; j <= time; j++)
        {
            strArr2.push(char);
        }
    }
    else
    {
        let time = strArr2.length - strArr1.length;
        for (let i = 0; i < time; i++)
        {
            strArr1.push(char);
        }
    }

    var mashArr = new Array();
    var time = strArr1.length;
    for (let i = 0; i < time; i++)
    {
        mashArr.push(strArr1[i]);
        mashArr.push(strArr2[i]);
    }

    return mashArr.join('');
}


module.exports = {
    firstName: "Cheng", 
    lastName: "Chen", 
    studentId: "10473438",
    sortString,
    replaceChar,
    mashUp
};