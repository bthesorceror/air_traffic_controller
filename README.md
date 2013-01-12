air_traffic_controller
======================

Re routing event emitter events for great good

Example:

```javascript
  var EventEmitter = require('events').EventEmitter,
      emitter      = new EventEmitter(),
      atc          = require('air_traffic_controller').createController(emitter);

  function handleThis(arg1, arg2) {

  }

  atc.route('1'

  emitter.on('2', handleThis);

  emitter.emit('1', 'Brandon', 'Farmer');
```

handleThis will be called and receive the arguments 'Brandon' and 'Farmer'

I am planning on using this module to connect other event based modules and for fanning out events
