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
    done();
  });

  it("routes event message with no arguments correctly", function(done) {
    atc.route(from, to);
    emitter.on(to, function() {
      assert.equal(arguments.length, 0);
      done();
    });

    emitter.emit(from);
  });

  it("routes event message with 1 arguments correctly", function(done) {
    var arg_value = 'hello brandon';

    atc.route(from, to);
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

    atc.route(from, to);
    emitter.on(to, function(arg1, arg2, arg3) {
      assert.equal(arg1, arg_value_1);
      assert.equal(arg2, arg_value_2);
      assert.equal(arg3, arg_value_3);
      assert.equal(arguments.length, 3);
      done();
    });

    emitter.emit(from, arg_value_1, arg_value_2, arg_value_3);
  });

  it("routes event message with 1 argument and 1 prefix argument correctly", function(done) {
    var arg_value_1        = 'hello brandon',
        prefix_arg_value_1 = 'there you are!';

    var options = {
      prefix_arguments: [ prefix_arg_value_1 ]
    }

    atc.route(from, to, options);
    emitter.on(to, function(arg1, arg2) {
      assert.equal(arg1, prefix_arg_value_1);
      assert.equal(arg2, arg_value_1);
      assert.equal(arguments.length, 2);
      done();
    });

    emitter.emit(from, arg_value_1);
  });

  it("routes event message with 1 argument and multiple prefix arguments correctly", function(done) {
    var arg_value_1        = 'hello brandon',
        prefix_arg_value_1 = 'there you are!',
        prefix_arg_value_2 = 'again on my own',
        prefix_arg_value_3 = 'down that dusty';

    var options = {
      prefix_arguments: [ prefix_arg_value_1, prefix_arg_value_2, prefix_arg_value_3 ]
    }

    atc.route(from, to, options);
    emitter.on(to, function(arg1, arg2, arg3, arg4) {
      assert.equal(arg1, prefix_arg_value_1);
      assert.equal(arg2, prefix_arg_value_2);
      assert.equal(arg3, prefix_arg_value_3);
      assert.equal(arg4, arg_value_1);
      assert.equal(arguments.length, 4);
      done();
    });

    emitter.emit(from, arg_value_1);
  });

  it("routes event message with multiple arguments and multiple prefix arguments correctly", function(done) {
    var arg_value_1        = 'hello brandon',
        arg_value_2        = 'hello tater',
        arg_value_3        = 'hello steve',
        prefix_arg_value_1 = 'there you are!',
        prefix_arg_value_2 = 'again on my own',
        prefix_arg_value_3 = 'down that dusty';

    var options = {
      prefix_arguments: [ prefix_arg_value_1, prefix_arg_value_2, prefix_arg_value_3 ]
    }

    atc.route(from, to, options);
    emitter.on(to, function(arg1, arg2, arg3, arg4, arg5, arg6) {
      assert.equal(arg1, prefix_arg_value_1);
      assert.equal(arg2, prefix_arg_value_2);
      assert.equal(arg3, prefix_arg_value_3);
      assert.equal(arg4, arg_value_1);
      assert.equal(arg5, arg_value_2);
      assert.equal(arg6, arg_value_3);
      assert.equal(arguments.length, 6);
      done();
    });

    emitter.emit(from, arg_value_1, arg_value_2, arg_value_3);
  });
});
