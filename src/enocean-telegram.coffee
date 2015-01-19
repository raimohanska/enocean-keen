_ = require "lodash"
hex = require "./hex"

telegramTypes = {
  "a5": "4bs"
  "d2": "vld"
}

class EnoceanTelegram
  constructor: (@buffer) ->
  is4bs: -> @descType() == "4bs"
  rorg: -> @hexValue(6)
  descType: -> (telegramTypes[@rorg()]) || (@rorg())
  hexValue: (i) -> hex.formatHex(@buffer[i])
  enoceanAddress: -> _(@buffer).drop(11).take(4).map(hex.formatHex).join(":")
  dataAsString: -> _(@buffer).map(hex.formatHex).join(" ")
  toString: -> @descType() + " <-> " + @enoceanAddress() + "    " + @dataAsString()

module.exports = EnoceanTelegram
