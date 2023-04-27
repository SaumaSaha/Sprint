const textStyle = function(styleCode, text) {
  return "\033[" + styleCode + "m" + text + "\033[0m";
}

const bold = function(text) {
  return textStyle(1, text);
}

const underline = function(text) {
  return textStyle(4, text);
}

const redFg = function(text) {
  return textStyle(31, text);
}

const blueFg = function(text) {
  return textStyle(34, text);
}

const greenFg = function(text) {
  return textStyle(32, text);
}

const yellowFg = function(text) {
  return textStyle(33, text);
}

exports.bold = bold;
exports.underline = underline;
exports.redFg = redFg;
exports.blueFg = blueFg;
exports.greenFg = greenFg;
exports.yellowFg = yellowFg;
