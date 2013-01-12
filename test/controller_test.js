var assert           = require('assert'),
    EventEmitter     = require('events').EventEmitter,
    createController = require('../air_traffic_controller').createController;

describe("Air Traffic Controller", function() {
  var emitter = new EventEmitter(),
      atc     = createController(emitter),
      from    = '1',
      to      = '2';

  beforeEach(function(done) {
    emitter.removeAllListeners();
    atc.route(from, to);
    done();
  });

  it("routes event message with no arguments correctly", function(done) {
    emitter.on(to, function() {
      assert.equal(arguments.length, 0);
      done();
    });

    emitter.emit(from);
  });

  it("routes event message with 1 arguments correctly", function(done) {
    var arg_value = 'hello brandon';

    emitter.on(to, function(arg) {
      assert.equal(arg, arg_value);
      assert.equal(arguments.length, 1);
      done();
    });

    emitter.emit(from, arg_value);
  });

  it("routes event message with multiple arguments correctly", function(done) {
    var arg_value_1 = 'hello brandon',
        arg_value_2 = 'where are we?',
        arg_value_3 = 'there you are!';

    emitter.on(to, function(arg1, arg2, arg3) {
      assert.equal(arg1, arg_value_1);
      assert.equal(arg2, arg_value_2);
      assert.equal(arg3, arg_value_3);
      assert.equal(arguments.length, 3);
      done();
    });

    emitter.emit(from, arg_value_1, arg_value_2, arg_value_3);
  });
});
