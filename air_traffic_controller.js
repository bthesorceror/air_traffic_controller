function buildArguments(input, to, prefix, suffix) {
  var args = Array.prototype.slice.apply(input);
  prefix.reverse().forEach(function(arg) {
    args.unshift(arg);
  });

  args.unshift(to);

  suffix.forEach(function(arg) {
    args.push(arg);
  });
  return args;
}

function createController(emitter) {
  return {
    route: function(from, to, options) {
      options = options || {};

      var prefix = options['prefix_arguments'] || [],
          suffix = options['suffix_arguments'] || [];

      emitter.on(from, function() {
        var input = arguments
        to = (to instanceof Array ? to : [to])
        to.forEach(function(event) {
          args = buildArguments(input, event, prefix, suffix)
          emitter.emit.apply(emitter, args);
        });
      });
    }
  }
}

exports.createController = createController;
