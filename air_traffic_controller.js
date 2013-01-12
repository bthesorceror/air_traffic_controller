function createController(emitter) {
  return {
    route: function(from, to) {
      emitter.on(from, function() {
        Array.prototype.unshift.call(arguments, to);
        emitter.emit.apply(emitter, arguments);
      });
    }
  }
}

exports.createController = createController;
