const {deepStrictEqual} = require('assert');
const {describe, it} = require('node:test');
const {main} = require("../src/sprint.js");

describe('Sprint', function() {
  it('Should return return 0 on successful execution', function() {
    deepStrictEqual(main(), 0);
  });
});

