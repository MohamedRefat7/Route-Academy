function majorityElement(nums) {
  let candidate = null;
  let count = 0;

  for (let num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += num === candidate ? 1 : -1;
  }

  return candidate;
}

const arr1 = [3, 2, 3];
const arr2 = [2, 2, 1, 1, 1, 2, 2];

console.log(majorityElement(arr1));
console.log(majorityElement(arr2));
