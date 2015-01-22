_ = require "lodash"
hex = require "./hex"

telegramTypes = {
  "a5": "4bs"
  "d2": "vld"
}

class EnoceanTelegram
  constructor: (@buffer) ->
    return new EnoceanTelegram(buffer) if not this instanceof EnoceanTelegram
    return buffer if buffer instanceof EnoceanTelegram
  is4bs: -> @descType() == "4bs"
  rorg: -> @hexValue(6)
  descType: -> (telegramTypes[@rorg()]) || (@rorg())
  hexValue: (i) -> hex.formatHex(@buffer[i])
  enoceanAddress: -> _(@buffer).drop(11).take(4).map(hex.formatHex).join(":")
  dataAsString: -> _(@buffer).map(hex.formatHex).join(" ")
  toString: -> @descType() + " <-> " + @enoceanAddress() + "    " + @dataAsString()

EnoceanTelegram.create = (address, type = "4bs", length = 24) ->
  buffer = [1..length].map(->0)
  rorg = _.findKey(telegramTypes, (x) -> x == type)
  buffer[6] = hex.parseHex(rorg)
  address.split(":").map(hex.parseHex).forEach (x, index) -> buffer[index + 11] = x
  telegram = new EnoceanTelegram(buffer)
  telegram.set = (index, value) ->
    buffer[index] = value
    this
  telegram

EnoceanTelegram.types = telegramTypes

module.exports = EnoceanTelegram
