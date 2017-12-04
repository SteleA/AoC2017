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

const addCoordinates = (arr, index, direction, all) => {
  switch (direction) {
    // right
    case 0:
      return arr.map((n, i) => ({ x: index, y: (i - arr.length) + index, value: n }));
    // top
    case 1:
      return arr.map((n, i) => ({ x: arr.length - (index + 1) - i, y: index, value: n }));
    // left
    case 2:
      return arr.map((n, i) => ({ x: index * -1, y: ((i - arr.length) + index) === 0 ? 0 : ((i - arr.length) + index) * -1, value: n }));
    // bottom
    case 3:
      return arr.map((n, i) => ({ x: ((arr.length - (index + 1) - i) * -1) === 0 ? 0 : ((arr.length - (index + 1) - i) * -1), y: index * -1, value: n }));

  }
}

const fn = (input) => {
  console.time('timer')
  const sqr = Number.isInteger(Math.sqrt(input)) ? Math.sqrt(input) : Math.ceil(Math.sqrt(input));
  const times = sqr % 2 === 1 ? sqr : sqr + 1;

  const matrix = range(9)
    .map(n => (n + 1) % 2 === 1 ? generateSpiral(n + 1) : false)
    .filter(Boolean)
    .map((arr, index) =>
      index === 0 ?
        [{ x: 0, y: 0, value: 1 }] :
        arr
          .map((_arr, i) => addCoordinates(_arr, index, i, arr))
          .reduce((acc, curr) => [...acc, ...curr])
    )
    .reduce((acc, curr) => [...acc, ...curr], [])
    .reduce((acc, curr, index, array) => {
      const limitedArray = array.slice(index - 10, index);
      const current = Object.assign({}, curr);

      const posible = [
        { x: -1, y: -1 },
        { x: -1, y: 0 },
        { x: -1, y: 1 },

        { x: 0, y: -1 },
        { x: 0, y: 1 },

        { x: 1, y: -1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
      ]
        .map(n => ({ x: current.x + n.x, y: current.y + n.y }))
        .map(n => acc.find(item => item.x === n.x && item.y === n.y))
        .filter(Boolean)
        .reduce((_acc, _curr) => _acc + _curr.value, 0);

      return [...acc, Object.assign({}, curr, { value: posible })]
    }, [{ x: 0, y: 0, value: 1 }])
    .find(item => item.value > input);
  return matrix
  const x = matrix.x < 0 ? matrix.x * -1 : matrix.x;
  const y = matrix.y < 0 ? matrix.y * -1 : matrix.y;
  console.timeEnd('timer')
  return x + y;
}

module.exports = fn;

console.log(fn(input))