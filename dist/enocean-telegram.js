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

module.exports = EnoceanTelegram;
