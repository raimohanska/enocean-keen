var EnoceanTelegram, hex, telegramTypes, _;

_ = require("lodash");

hex = require("./hex");

telegramTypes = {
  "a5": "4bs",
  "d2": "vld"
};

EnoceanTelegram = (function() {
  function EnoceanTelegram(buffer) {
    this.buffer = buffer;
    if (!this instanceof EnoceanTelegram) {
      return new EnoceanTelegram(buffer);
    }
    if (buffer instanceof EnoceanTelegram) {
      return buffer;
    }
  }

  EnoceanTelegram.prototype.is4bs = function() {
    return this.descType() === "4bs";
  };

  EnoceanTelegram.prototype.rorg = function() {
    return this.hexValue(6);
  };

  EnoceanTelegram.prototype.descType = function() {
    return telegramTypes[this.rorg()] ||  (this.rorg());
  };

  EnoceanTelegram.prototype.hexValue = function(i) {
    return hex.formatHex(this.buffer[i]);
  };

  EnoceanTelegram.prototype.enoceanAddress = function() {
    return _(this.buffer).drop(11).take(4).map(hex.formatHex).join(":");
  };

  EnoceanTelegram.prototype.dataAsString = function() {
    return _(this.buffer).map(hex.formatHex).join(" ");
  };

  EnoceanTelegram.prototype.toString = function() {
    return this.descType() + " <-> " + this.enoceanAddress() + "    " + this.dataAsString();
  };

  return EnoceanTelegram;

})();

EnoceanTelegram.create = function(address, type, length) {
  var buffer, rorg, telegram, _i, _results;
  if (type == null) {
    type = "4bs";
  }
  if (length == null) {
    length = 24;
  }
  buffer = (function() {
    _results = [];
    for (var _i = 1; 1 <= length ? _i <= length : _i >= length; 1 <= length ? _i++ : _i--){ _results.push(_i); }
    return _results;
  }).apply(this).map(function() {
    return 0;
  });
  rorg = _.findKey(telegramTypes, function(x) {
    return x === type;
  });
  buffer[6] = hex.parseHex(rorg);
  address.split(":").map(hex.parseHex).forEach(function(x, index) {
    return buffer[index + 11] = x;
  });
  telegram = new EnoceanTelegram(buffer);
  telegram.set = function(index, value) {
    buffer[index] = value;
    return this;
  };
  return telegram;
};

EnoceanTelegram.types = telegramTypes;

module.exports = EnoceanTelegram;
