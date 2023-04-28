const {deepStrictEqual} = require('assert');
const {describe, it} = require('node:test');
const {execute} = require("../src/sprint.js");

describe('Sprint', function() {
  it('Adding 45 and 55 should give 100', function() {
    deepStrictEqual(execute(
      {
        memory: [
          3,  2, 0, 45, 13,  0,
          55, 14, 1, 13, 14, 15,
          9
        ],
        pc: 0,
        halt: false
      }),
      {
        memory: [
          3,  2,  0,  45, 13,  0,
          55, 14,  1,  13, 14, 15,
          9, 45, 55, 100
        ],
        halt: true,
        pc: 13
      });
  });
});

