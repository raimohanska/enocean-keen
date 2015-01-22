EK = require "../dist/enocean-keen.js"

keenClient = {
  addEvent: (event) ->
}

lights = {
  "00:11:22:33": EK.dimmableLight("room1", "lamp1")
}

handler = EK.init { keenClient, lights }

telegram = EK.EnoceanTelegram
  .create("00:11:22:33")
  .set(8, 100)

handler.sentData telegram
