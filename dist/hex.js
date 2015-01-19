var formatHex, pad2;

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

module.exports = {
  formatHex: formatHex
};
