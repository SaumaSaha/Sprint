const load = function(code, memory) {
  return code.map(function(token) {
    memory.push(token);
  });
};

const assign = function(memory, pc) {
  const data = memory[pc + 1];
  const index = memory[pc + 2];
  memory[index] = data;
  return pc + 3;
};

const add = function(memory, pc) {
  const resultIndex = memory[pc + 3];
  const augendIndex = memory[pc + 1];
  const addendIndex = memory[pc + 2];
  memory[resultIndex] = memory[augendIndex] + memory[addendIndex];
  return pc + 4;
};

const sub = function(memory, pc) {
  const resultIndex = memory[pc + 3];
  const minuendIndex = memory[pc + 1];
  const subtrahendIndex = memory[pc + 2];
  memory[resultIndex] = memory[minuendIndex] - memory[subtrahendIndex];
  return pc + 4;
};

const jump = function(memory, pc) {
  return memory[pc + 1];
};

const jumpEqual = function(memory, pc) {
  const lhsIndex = memory[pc + 1];
  const rhsIndex = memory[pc + 2];
  if(memory[lhsIndex] === memory[rhsIndex]) {
    return memory[pc + 3];
  }

  return pc + 4;
};

const jumpLessThan = function(memory, pc) {
  const lhsIndex = memory[pc + 1];
  const rhsIndex = memory[pc + 2];
  if(memory[lhsIndex] < memory[rhsIndex]) {
    return memory[pc + 3];
  }

  return pc + 4;
};

const operations = {
  '0': assign,
  '1': add,
  '2': sub,
  '3': jump,
  '4': jumpEqual,
  '5': jumpLessThan
};

const execute = function(memory) {
  let pc = 0;

  while(true) {
    const currentOperation = memory[pc]; 
    if(currentOperation === 9) {
      return 0;
    }
    pc = operations[currentOperation](memory, pc);
  }
};

const main = function() {
  const memory = [];
  const code = [
    0, 24, 100,
    0, 5, 101,
    0, 0, 102,
    0, 0, 103,
    5, 100, 103, 22,
    1, 101, 103, 103,
    3, 12,
    2, 103, 101, 103,
    2, 100, 103, 102,
    9
  ];
  load(code, memory);
  execute(memory);
  console.log(memory);
  return 0;
};

exports.main = main;
