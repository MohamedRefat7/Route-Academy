/////////////////// 1 /////////////////////////////
/* function skipNumbers() {
  for (let i = 0; i <= 10; i++) {
    if (i % 3 === 0) {
      continue;
    }
    console.log(i);
  }
}
skipNumbers(); */

////////////////// 2 //////////////////////////
/* function calculateSum() {
  let sum = 0;
  let i = 1;
  while (i <= 100) {
    sum += i;
    i++;
  }
  return sum;
}
console.log(calculateSum()); */

////////////////////// 3 ////////////////////
/* function printArrayElements(arr) {
  arr.forEach((element) => {
    console.log(element);
  });
}
const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
printArrayElements(myArray); */

/////////////////// 4 //////////////////////
/* const arr1 = [1, 2, 3];
arr1.forEach((element) => {
  if (element === 2) return;
  console.log(element);
});

const arr2 = [1, 2, 3];
for (const element of arr2) {
  if (element === 2) continue; // Skips 2
  console.log(element);
} */
////////////////// 5 ///////////////////////
/* function personInfo(person) {
  const { name, age } = person;
  return `${name} is ${age} years old`;
}
let person = { name: "John", age: 25 };
console.log(personInfo(person)); */

///////////////// 6 /////////////////////
/* function mergeArrays(arr1, arr2) {
  return [...arr1, ...arr2];
}
let arr1 = [10, 20, 30];
let arr2 = [40, 50, 60];
console.log(mergeArrays(arr1, arr2));
 */

//////////////////// 7 ////////////////////
/* function sum(...numbers) {
  return numbers.reduce((acc, current) => acc + current, 0);
}
console.log(sum(1, 2, 3, 4, 5, 6)); */

////////////// 8 ////////////////////
/* // primative
let a = 10;
let b = a; // b is a copy
b = 20;
console.log(a); // bec primative is immutable
// non-primitive
let obj1 = { name: "mohamed" };
let obj2 = obj1;
obj2.name = "refat";
console.log(obj1.name); */

////////////////////// 9 ////////////////////////////
/* // Hoisting
hello();
function hello() {
  console.log(`hello from mohamed`);
}
// TDZ
console.log(y);
let y = "hello from mohamed"; */

//////////////////// 10 ////////////////////////
/* function createCounter() {
  let counter = 0;
  return function () {
    counter++;
    return counter;
  };
}
const counter = createCounter();
console.log(counter());
console.log(counter()); */

//////////////////// 11 //////////////////////////
/* function returnPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("success");
    }, 3000);
  });
}
returnPromise().then((message) => {
  console.log(message);
});
 */

/////////////////////// 12 ///////////////////////
/* function returnPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("success");
    }, 3000);
  });
}
async function Delay() {
  const message = await returnPromise();
  console.log(message);
}
Delay();
 */

///////////////// 13 /////////////////////////
/* function randomNumber() {
  return new Promise((resolve, reject) => {
    const RandomNumber = Math.floor(Math.random() * 10);
    if (RandomNumber > 5) {
      resolve(`The ${RandomNumber} is greater than 5`);
    } else {
      reject(`The ${RandomNumber} is smaller than 5`);
    }
  });
}
randomNumber()
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log(error);
  });
 */

//////////////////////// 14 ////////////////////////////////
/* function initialPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(6);
    }, 1000);
  });
}

initialPromise()
  .then((value) => {
    console.log(`Initial value: ${value}`);
    return value * 2;
  })
  .then((doubledValue) => {
    console.log(`Doubled value: ${doubledValue}`);
    return doubledValue + 3;
  })
  .then((finalValue) => {
    console.log(`Final value: ${finalValue}`);
  })
  .catch((error) => {
    console.error("Error:", error);
  }); */
//////////////////////// 15 //////////////////////////////
/* function AsyncOperation(success = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve("success");
      } else {
        reject(new Error(" failed"));
      }
    }, 1000);
  });
}

async function executeAsyncOperation() {
  try {
    const result = await AsyncOperation(false); // or true
    console.log(result);
  } catch (error) {
    console.error("Caught an error:", error.message);
  }
}
executeAsyncOperation(); */
