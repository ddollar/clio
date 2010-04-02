var sys = require('sys');
require.paths.unshift('lib/ext/lib')
require('ext');

function write(message) {
  var date = new Date();
  sys.puts('[' + date.format('%Y-%m-%d %H:%M:%S') + '] ' + message);
}

exports.write = write;
