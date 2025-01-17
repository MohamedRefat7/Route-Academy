/////////////////// 1 ////////////////////
function SumNumbers(x, y) {
  return x + y;
}
console.log(SumNumbers(3, 5));

////////////////// 2 ////////////////
function Prime(num) {
  if (num <= 1) return false;
  for (let i = 2; i < Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}
console.log(Prime(7));

///////////////// 3 /////////////////////
function reverseInput(str) {
  return str.split("").reverse().join("");
}
console.log(reverseInput("hello"));

/////////////// 4 ////////////////////
function findTheLargest(arr) {
  return Math.max(...arr);
}
console.log(findTheLargest([1, 3, 7, 2, 4]));

//////////////// 5 ///////////////////////
function filterArray(arr) {
  return arr.filter((num) => num % 2 === 0);
}
console.log(filterArray([1, 2, 3, 4, 5, 6]));

////////////////// 6 ////////////////////
function reverseString(str) {
  let resversedWord = "";
  for (let i = str.length - 1; i >= 0; i--) {
    resversedWord += str[i];
  }
  return resversedWord;
}
console.log(reverseString("route"));

///////////////////////// 7 ////////////////////
function calculateAverage(arr) {
  let sum = 0;
  for (i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
}
console.log(calculateAverage([1, 2, 3, 4, 5]));

/////////////////// 8 ////////////////////
function WeekDayOrEnd(day) {
  if (day >= 1 && day <= 5) return "weekday";
  else {
    return "weekend";
  }
}
console.log(WeekDayOrEnd(3));
console.log(WeekDayOrEnd(6));

//////////////////// 9 //////////////////////////
function FilterArray(arr) {
  return arr.filter((num) => num % 2 === 0 || num % 3 === 0);
}
console.log(FilterArray([1, 2, 3, 4, 5, 6, 7, 8, 9]));

///////////////////////// 10 //////////////////////////
function findElementIndex(arr, element) {
  for (i = 0; i < arr.length; i++) {
    if (element === arr[i]) {
      return i;
    }
  }
  return -1;
}
console.log(findElementIndex([1, 2, 3, 4, 5], 3));

////////////////////// 11 /////////////////////////
function factorial(num) {
  if (num === 0 || num === 1) {
    return 1;
  }
  return num * factorial(num - 1);
}
console.log(factorial(5));

///////////////// 12 ////////////////////////////////
function objToArray(obj) {
  return Object.keys(obj);
}
console.log(objToArray({ name: "mohamed", age: 22 }));

/////////////////// 13 //////////////////////////////
function getUniqueNumbers(arr) {
  return [...new Set(arr)];
}
console.log(getUniqueNumbers([1, 2, 2, 3, 4, 4, 5]));

///////////////////// 14 ///////////////////////
function countCharacter(str) {
  const charcounter = {};
  for (const char of str) {
    charcounter[char] = (charcounter[char] || 0) + 1;
  }
  return charcounter;
}
console.log(countCharacter("Hello"));

////////////////// 15 ///////////////////////
function sortNumbers(arr) {
  return arr.sort((a, b) => a - b);
}
console.log(sortNumbers([1, 3, 5, 6, 2, 4, 7, 8]));

////////////////////// 16 /////////////////////////////
function areAnargams(str1, str2) {
  const normalize = (str) => str.replace(/\s+/g, "").toLowerCase();
  const normalizedstr1 = normalize(str1);
  const normalizedstr2 = normalize(str2);
  if (normalizedstr1.length !== normalizedstr2.length) return false;
  const sortrdstr1 = normalizedstr1.split("").sort().join("");
  const sortedstr2 = normalizedstr2.split("").sort().join("");
  return sortrdstr1 === sortedstr2;
}
console.log(areAnargams("listen", "silent"));

/////////////////////// 17 ///////////////////////
function removeFalseValues(arr) {
  return arr.filter(Boolean);
}
console.log(
  removeFalseValues([0, false, "Hello", "", null, undefined, NaN, 42])
);

//////////////////// 18 ///////////////////////////
function createCarObject(model, year) {
  return {
    model: model,
    year: year,
    CarDetails: function () {
      return `Model: ${this.model}, Year: ${this.year}`;
    },
  };
}
console.log(createCarObject("nissan", 2016).CarDetails());

/////////////// 19 ////////////////////////////
function hasOwnProperty(obj, property) {
  return obj.hasOwnProperty(property);
}
const input = { name: "mohamed", age: 22 };
console.log(hasOwnProperty(input, "name"));
console.log(hasOwnProperty(input, "address"));

//////////////////////////// 20 /////////////////////////////
function countVowels(str) {
  const vowels = str.toLowerCase().match(/[aeiou]/g);
  return vowels ? vowels.length : 0;
}
console.log(countVowels("Hello World"));

/////////////////////////// 21 ////////////////////////////
function splitString(str) {
  return str.split(" ");
}
console.log(splitString("Hello my name is mohamed"));

///////////////////// 22 ////////////////////////////
function Operators(num1, num2, operator) {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      if (num2 !== 0) {
        return num1 / num2;
      } else {
        return "not divisible by zero";
      }
    default:
      return "invalid operator";
  }
}
console.log(Operators(3, 2, "+"));
console.log(Operators(5, 3, "%"));
