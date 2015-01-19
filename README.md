## enocean-keen

Send data from your enocean-devices to [Keen.IO](http://keen.io/).

```coffeescript
Keen = require "keen.io"
EK = require("enocean-keen")

sensors = {
  "02:55:65:a3": (telegram, keenClient) -> console.log "custom handler", telegram.toString()
  "21:81:55:a3": EK.temperature("inside", 0, 40)
}

lights = {
  "aa:8e:12:82": EK.dimmableLight("livingroom", "reading lamp")
  "f0:3e:43:81": EK.dimmableLight("livingroom", "ceiling lamp")
  "3e:41:ff:55": EK.onOffLight("kitchen", "ceiling lamp")
}

keenClient = Keen.configure {
  projectId: "<projectid>"
  writeKey: "<writekey>"
}

enoceanHandler = EK.init { keenClient, lights, sensors }
```

The `enoceanHandler` returned by `EnoceanKeen.init` has methods `receivedData` and `sentData` that can handle incoming and outgoing enocean telegrams respectively. Each method consumes a Buffer of enocean data.

I'm using this in combination with my [Huom.IO](http://houm.io/) setup.
