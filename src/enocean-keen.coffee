_ = require "lodash"
Keen = require "keen.io"
EnoceanTelegram = require "./enocean-telegram"

temperature = (location, min = 0, max = 40) -> (telegram, keenClient) ->
  temperature = (255 - telegram.buffer[9]) / 255 * (max - min) + min
  keenSend keenClient, "sensors",
    { type: "temperature", location: location, value: temperature, device: telegram.enoceanAddress() }

dimmableLight = (group, name) -> (telegram, keenClient) ->
  brightness = telegram.buffer[8]
  keenSend keenClient, "lights",
    { type: "brightness", location: group, light: name, brightness, device: telegram.enoceanAddress() }

onOffLight = (group, name) -> (telegram, keenClient) ->
  brightness = telegram.buffer[9] * 100
  keenSend keenClient, "lights",
    { type: "brightness", location: group, light: name, brightness, device: telegram.enoceanAddress() }

keenSend = (keenClient, collection, event) ->
  console.log "Send to keen", collection, event
  keenClient.addEvent collection, event, (err, res) ->
    if err
      console.log "Keen error:  " + err
    else
      console.log "Keen sent"

withErrorHandling = (f) -> () ->
  try
    f.apply(this, arguments)
  catch e
    console.log "******* ERROR *******", e


init = ({ keenClient, lights, sensors}) ->
  receivedData = withErrorHandling (data) ->
    telegram = new EnoceanTelegram(data)
    if telegram.is4bs()
      handler = sensors?[telegram.enoceanAddress()]
      if handler
        handler(telegram, keenClient)
      else
        console.log "got data from unknown sensor", telegram.toString()

  sentData = withErrorHandling (data) ->
    telegram = new EnoceanTelegram(data)
    handler = lights?[telegram.enoceanAddress()]
    if handler
      handler(telegram, keenClient)
    else
      console.log "sent data to unknown device", telegram.toString()
  { receivedData, sentData }

module.exports = { init, onOffLight, dimmableLight, temperature }
