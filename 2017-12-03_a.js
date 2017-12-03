const input = 368078;

const range = (end, start = 0) => {
  const arr = [];
  while (arr.length < end) {
    arr.push(arr.length)
  }
  return arr;
}

const generateSpiral = (arrSize) => {
  if (arrSize === 1) {
    return [1]
  }
  const start = (arrSize - 2) * (arrSize - 2) + 1;
  const right = [...range(arrSize - 2).map((_, index) => start + index)];
  const top = range(arrSize).map((_, index) => right.slice(-1)[0] + index + 1);
  const left = range(arrSize - 2).map((_, index) => top.slice(-1)[0] + index + 1);
  const bottom = range(arrSize).map((_, index) => left.slice(-1)[0] + index + 1);

  return [right, top, left, bottom]
}

const addCoordinates = (arr, index, direction) => {
  switch (direction) {
    case 0:
      return arr.map((n, i) => ({ x: index, y: (i - arr.length) + index, value: n }));

    case 1:
      return arr.map((n, i) => ({ x: arr.length - (index + 1) - i, y: index, value: n }));

    case 2:
      return arr.map((n, i) => ({ x: index * -1, y: ((i - arr.length) + index) === 0 ? 0 : ((i - arr.length) + index) * -1, value: n }));

    case 3:
      return arr.map((n, i) => ({ x: ((arr.length - (index + 1) - i) * -1) === 0 ? 0 : ((arr.length - (index + 1) - i) * -1), y: index * -1, value: n }));

  }
}

const fn = (input) => {
  const sqr = Number.isInteger(Math.sqrt(input)) ? Math.sqrt(input) : Math.ceil(Math.sqrt(input));
  const times = sqr % 2 === 1 ? sqr : sqr + 1;

  const matrix = range(times)
    .map(n => (n + 1) % 2 === 1 ? generateSpiral(n + 1) : false)
    .filter(Boolean)
    .map((arr, index) =>
      index === 0 ?
        [{ x: 0, y: 0, value: 1 }] :
        arr
          .map((_arr, i) => addCoordinates(_arr, index, i))
          .reduce((acc, curr) => [...acc, ...curr])
    )
    .reduce((acc, curr) => [...acc, ...curr], [])
    .find(item => item.value === input);

  const x = matrix.x < 0 ? matrix.x * -1 : matrix.x;
  const y = matrix.y < 0 ? matrix.y * -1 : matrix.y;

  return x + y;
}

module.exports = fn;
console.log(fn(input))