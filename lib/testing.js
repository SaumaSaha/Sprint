const style = require('./style.js');

const {bold, underline, redFg, blueFg, greenFg, yellowFg} = style;

const testLog = [];

const updateTestLog = function(expected, actual, message, result, functionName) {
  testLog.push({
    result,
    message,
    expected,
    actual,
    functionName
  });
}

const getTestLog = function() {
  return testLog;
}

const getNoOfTestPassed = function(log) {
  let noOfTestPassed = 0;
  for(const entry of log) {
    noOfTestPassed += entry.result ? 1 : 0;
  }
  return noOfTestPassed;
}

const displaySummary = function() {
  const summary = '\n' + yellowFg("Summary : ") +
    getNoOfTestPassed(getTestLog()) + '/' + getTestLog().length + 
    greenFg(" Test Passed");
  console.log(bold(summary));
}

const groupTestLogByKey = function(key) {
  const groups = {};
  for(const log of getTestLog()) {
    if(!groups[log[key]])
      groups[log[key]] = [];
    groups[log[key]].push(log);
  }

  return groups;
}

const printFunctionTests = function(functionName) {
  const log = groupTestLogByKey("functionName");
  console.table(log[functionName]);
  const summary = "No of Test Passed = " + getNoOfTestPassed(log[functionName]) + "/" + log[functionName].length;
  console.log(summary.padStart(100));
}

const generateFailedMessage = function(expected, actual, testMessage) {
  const expectedValue = greenFg("\n\tExpected\t:" + expected);
  const actualValue = redFg("\n\tActual\t\t:" + actual);
  const failMessage = actualValue + expectedValue;

  return failMessage;
}

const displayHeader = function(fnName) {
  const header = fnName;
  console.log("\n" + underline(blueFg(header)));
}

const displayTestMessage = function(expected, actual, result, testMessage) {
  const icon = result ? "✅" : "❌";
  let message = "";
  message += icon + " ";
  message += testMessage;

  if(result === false) {
    message += generateFailedMessage(expected, actual);
  }
  console.log(message);
}

const areArraysEqual = function(array1, array2) {
  if(array1.length !== array2.length) {
    return false;
  }

  return array1.every(function(element, index) {
    return areEqual(element, array2[index]);
  });
}

const areObjectsEqual = function(object1, object2) {
  if(Object.keys(object1).length !== Object.keys(object2).length) {
    return false;
  }

  for(const key in object1) {
    if(!areEqual(object1[key], object2[key])) {
      return false;
    }
  }
  return true;
}

const isObject = function(a) {
  return !Array.isArray(a) && typeof a === 'object';
}

const areEqual = function(a, b) {
  if(a === b) {
    return true;
  }

  if([a, b].every(Array.isArray)) {
    return areArraysEqual(a, b);
  }

  if([a, b].every(isObject)) {
    return areObjectsEqual(a, b);
  }
}

const assertTest = function(actual, expected, message, functionName) {
  const result = areEqual(expected, actual);
  updateTestLog(expected, actual, message, result, functionName);
  displayTestMessage(expected, actual, result, message);
}

exports.assertTest = assertTest;
exports.areEqual = areEqual;
exports.displaySummary = displaySummary;
exports.displayHeader = displayHeader;
