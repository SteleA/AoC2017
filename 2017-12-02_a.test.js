const fn = require('./2017-12-02_a');

test('equal 8', () => {
  expect(fn('5\t1\t9\t5')).toBe(8);
});

test('equal 4', () => {
  expect(fn('7\t5\t3')).toBe(4);
});

test('equal 6', () => {
  expect(fn('2\t4\t6\t8')).toBe(6);
});
