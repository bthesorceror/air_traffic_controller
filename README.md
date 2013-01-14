air_traffic_controller
======================

[![Build Status](https://travis-ci.org/bthesorceror/air_traffic_controller.png)](https://travis-ci.org/bthesorceror/air_traffic_controller)

Re routing event emitter events for great good

Example:

```javascript
  var EventEmitter = require('events').EventEmitter,
      emitter      = new EventEmitter(),
      atc          = require('air_traffic_controller').createController(emitter);

  function handleThis(arg1, arg2) {

  }

  atc.route('1', '2');

  emitter.on('2', handleThis);

  emitter.emit('1', 'Brandon', 'Farmer');
```

handleThis will be called and receive the arguments 'Brandon' and 'Farmer'

Example 2:

```javascript
  var EventEmitter = require('events').EventEmitter,
      emitter      = new EventEmitter(),
      atc          = require('air_traffic_controller').createController(emitter);

  function handleThis(arg1, arg2) {

  }

  function handleThat(arg1, arg2) {

  }

  atc.route('1', ['2', '3']);

  emitter.on('2', handleThis);
  emitter.on('3', handleThat);

  emitter.emit('1', 'Brandon', 'Farmer');
```

handleThis and handleThat will be called and receive the arguments 'Brandon' and 'Farmer'

Example 3:

```javascript
  var EventEmitter = require('events').EventEmitter,
      emitter      = new EventEmitter(),
      atc          = require('air_traffic_controller').createController(emitter);

  function handleThis(arg1, arg2, arg3, arg4) {

  }

  options = {
    prefix: ['prefix'],
    suffix: ['suffix']
  }

  atc.route('1', '2', options);

  emitter.on('2', handleThis);

  emitter.emit('1', 'Brandon', 'Farmer');
```

handleThis will be called and receive the arguments 'prefix', 'Brandon', 'Farmer', and 'suffix' in that order

I am planning on using this module to connect other event based modules and for fanning out events
