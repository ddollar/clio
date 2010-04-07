var sys    = require("sys");
var events = require('events');

var SESSION_TIMEOUT   = 1; // seconds
var CLEANUP_FREQUENCY = 1; // seconds

function Monitor() {
  this.sessions = {};

  this.create_session = function(options) {
    var session = new MonitorSession(options);
    this.sessions[session.id] = session;
    session.monitor();
    return(session);
  }

  this.session = function(id) {
    var session = this.sessions[id];
    session.touch();
    return(session);
  }

  this.cleanup = function() {
    for (var session_id in this.sessions) {
      var session = this.sessions[session_id];
      if ((Date.now() - session.last_request) > (SESSION_TIMEOUT * 1000)) {
        session.close();
        delete this.sessions[session_id];
      }
    }
  }

  var monitor = this;

  // setInterval(function() {
  //   monitor.cleanup();
  // }, (CLEANUP_FREQUENCY * 1000));
}

function MonitorSession(options) {
  this.continuous   = options.continuous || false;
  this.filename     = options.filename;
  this.id           = Date.now().toString() + '.' + parseInt(Math.random() * 1000000);
  this.buffer       = [];
  this.child        = null;
  this.last_request = Date.now();
  this.exited       = false;

  this.monitor = function() {
    if (this.child) { return(false); }

    this.log(sprintf('began monitoring: %s', this.filename));

    var session = this;

    this.child = process.createChildProcess('tail', this.tail_args());

    this.child.addListener('output', function(data) {
      session.buffer.push(data);
    });

    this.child.addListener('exit', function(code) {
      session.emit('exit');
      session.exited = true;
    });
  }

  this.drain_buffer = function() {
    var data = '';
    while (this.buffer.length > 0) { 
      var chunk = this.buffer.shift();
      if (chunk) { data += chunk }
    }
    return(data);
  }

  this.touch = function() {
    this.last_request = Date.now();
  }

  this.log = function() {
    sys.puts(sprintf('[%s] [session:%s] %s',
      new Date().format('%Y-%m-%d %H:%M:%S'),
      this.id,
      sprintf.apply(this, arguments)
    ));
  }

  this.close = function() {
    var session = this;
    this.log('reaping processes');
    try { session.process.kill(); } catch(ex) { session.log('dead process') }
  }

  this.tail_args = function() {
    var args = ['-n', '200'];
    if (this.continuous) { args.push('-f') }
    args.push(this.filename);
    return(args);
  }

  this.log('created');
}

sys.inherits(MonitorSession, events.EventEmitter);

exports.Monitor = new Monitor();
