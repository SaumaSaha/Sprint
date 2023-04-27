const sprint = require("../src/sprint.js");
const testing = require("../lib/testing.js");

const main = sprint.main;
const assert = testing.assertTest;

assert(1, main(1), "Test Passed", "demoTest");
assert(0, main(1), "Test Falied", "demoTest");
