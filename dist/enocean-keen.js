var EnoceanTelegram, Keen, dimmableLight, init, keenSend, onOffLight, temperature, withErrorHandling, _;

_ = require("lodash");

Keen = require("keen.io");

EnoceanTelegram = require("./enocean-telegram");

temperature = function(location, min, max) {
  if (min == null) {
    min = 0;
  }
  if (max == null) {
    max = 40;
  }
  return function(telegram, keenClient) {
    temperature = (255 - telegram.buffer[9]) / 255 * (max - min) + min;
    return keenSend(keenClient, "sensors", {
      type: "temperature",
      location: location,
      value: temperature,
      device: telegram.enoceanAddress()
    });
  };
};

dimmableLight = function(group, name) {
  return function(telegram, keenClient) {
    var brightness;
    brightness = telegram.buffer[8];
    return keenSend(keenClient, "lights", {
      type: "brightness",
      location: group,
      light: name,
      brightness: brightness,
      device: telegram.enoceanAddress()
    });
  };
};

onOffLight = function(group, name) {
  return function(telegram, keenClient) {
    var brightness;
    brightness = telegram.buffer[9] * 100;
    return keenSend(keenClient, "lights", {
      type: "brightness",
      location: group,
      light: name,
      brightness: brightness,
      device: telegram.enoceanAddress()
    });
  };
};

keenSend = function(keenClient, collection, event) {
  console.log("Send to keen", collection, event);
  return keenClient.addEvent(collection, event, function(err, res) {
    if (err) {
      return console.log("Keen error:  " + err);
    } else {
      return console.log("Keen sent");
    }
  });
};

withErrorHandling = function(f) {
  return function() {
    var e;
    try {
      return f.apply(this, arguments);
    } catch (_error) {
      e = _error;
      return console.log("******* ERROR *******", e);
    }
  };
};

init = function(_arg) {
  var keenClient, lights, receivedData, sensors, sentData;
  keenClient = _arg.keenClient, lights = _arg.lights, sensors = _arg.sensors;
  receivedData = withErrorHandling(function(data) {
    var handler, telegram;
    telegram = new EnoceanTelegram(data);
    if (telegram.is4bs()) {
      handler = sensors != null ? sensors[telegram.enoceanAddress()] : void 0;
      if (handler) {
        return handler(telegram, keenClient);
      } else {
        return console.log("got data from unknown sensor", telegram.toString());
      }
    }
  });
  sentData = withErrorHandling(function(data) {
    var handler, telegram;
    telegram = new EnoceanTelegram(data);
    handler = lights != null ? lights[telegram.enoceanAddress()] : void 0;
    if (handler) {
      return handler(telegram, keenClient);
    } else {
      return console.log("sent data to unknown device", telegram.toString());
    }
  });
  return {
    receivedData: receivedData,
    sentData: sentData
  };
};

module.exports = {
  init: init,
  onOffLight: onOffLight,
  dimmableLight: dimmableLight,
  temperature: temperature,
  EnoceanTelegram: EnoceanTelegram
};
