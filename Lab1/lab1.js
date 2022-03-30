const questionOne = function questionOne(arr) {
    // Implement question 1 here
    var result = {};
    var num;
    if (arr == null)
        return result;
    
    for (var i = 0; i < arr.length; i++)
    {
        num = arr[i] ** 2 - 7;
        var absNum = Math.abs(num);

        if(absNum == 2)
        {
            result[absNum] = true;
            continue;
        }
        else if(absNum % 2 == 0)
        {  
            result[absNum] = false;
            continue;
        }

        var squareRoot = Math.sqrt(absNum);

        for (var j = 3; j <= squareRoot; j += 2)
        {
          if (absNum % j === 0) 
          {
            result[absNum] = false;
          }
        }

        if (result[absNum] == null)
            result[absNum] = true;
    }
    return result;
}

const questionTwo = function questionTwo(arr) { 
    // Implement question 2 here
    var result = [];

    for (var i = 0; i < arr.length; i++)
    {
        if (result.indexOf(arr[i]) == -1)
            result.push(arr[i]);
    }
    return result;
    }

const questionThree = function questionThree(arr) {
    // Implement question 3 here
    var uniqueArr = [];
    for (let i = 0; i < arr.length; i++)
    {
        if (uniqueArr.indexOf(arr[i]) == -1)
            uniqueArr.push(arr[i]);
    } 
    
    var sortUniqueArr = [];
    for (let i = 0; i < uniqueArr.length; i++)
    {
        let string = uniqueArr[i];
        string.toLowerCase();
        let stringArr = string.split('');
        stringArr.sort();
        string = stringArr.join('')
        sortUniqueArr.push(string);
    }
    
    var result = {};
    for (let i = 0; i < sortUniqueArr.length; i++)
    {
        if (sortUniqueArr[i] in result)
            continue;
        let repeat = [];
        for (let j = i + 1; j < sortUniqueArr.length; j++)
        {
            if (sortUniqueArr[i] == sortUniqueArr[j])
            {
                repeat.push(uniqueArr[i]);
                repeat.push(uniqueArr[j]);
            }
        }
        
        for (let j = 1; j < repeat.length; j++)
        {
            if (repeat.indexOf(repeat[j]) != j)
                repeat.splice(j,1)
        }
        if (repeat.length > 1)
            result[sortUniqueArr[i]] = repeat;    
    }
    return result;
    

}

const questionFour = function questionFour(num1, num2, num3) {
    // Implement question 4 here
    function factorial(num)
    {
        if (num <= 1)
            return 1;
        else
            return num * factorial(num - 1);
    }
    var sum = factorial(num1) + factorial(num2) + factorial(num3);
    var result = sum / [(num1 + num2 + num3) / 3];
    return Math.floor(result);
}

const sayHello = function sayHello(firstName, lastName) {

    if (!firstName) throw 'You must supply the first name parameter'
  
    if (!lastName) throw 'You must supply the last name parameter'
  
    if (typeof firstName  != 'string') throw 'First Name Must Be A String';
  
    if (typeof lastName  != 'string') throw 'Last Name Must Be A String';
  
     return `Hello ${firstName} ${lastName}!  How are you?`;
  
  }

module.exports = {
    firstName: "Cheng", 
    lastName: "Chen", 
    studentId: "10473438",
    questionOne,
    questionTwo,
    questionThree,
    questionFour,
    sayHello
};