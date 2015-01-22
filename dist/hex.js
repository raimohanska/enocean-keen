var formatHex, pad2, parseHex;

pad2 = function(x) {
  if (x.length >= 2) {
    return x;
  } else {
    return "0" + x;
  }
};

formatHex = function(n) {
  return pad2(n.toString(16));
};

parseHex = function(n) {
  return parseInt(n, 16);
};

module.exports = {
  formatHex: formatHex,
  parseHex: parseHex
};
