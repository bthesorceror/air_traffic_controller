function createController(emitter) {
  return {
    route: function(from, to, options) {
      options = options || {};
      var prefix_arguments = options['prefix_arguments'] || [];
      emitter.on(from, function() {
        args = arguments;
        prefix_arguments.reverse().forEach(function(arg) {
          Array.prototype.unshift.call(args, arg);
        });
        Array.prototype.unshift.call(args, to);
        emitter.emit.apply(emitter, args);
      });
    }
  }
}

exports.createController = createController;
