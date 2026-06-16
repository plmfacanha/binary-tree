let arr = [1, 2];

function sum(arr) {
  let count = 0;

  if (arr.length === 0) {
    return 0;
  } else {
    return arr[0] + sum(arr.slice(1));
  }
}

console.log(sum(arr));
