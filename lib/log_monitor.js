var sys = require("sys");
var log = require('./log');

var SESSION_TIMEOUT   = 1; // seconds
var CLEANUP_FREQUENCY = 1; // seconds

function LogMonitor() {
  this.sessions = {};

  this.create_session = function() {
    var session = new LogMonitorSession();
    this.sessions[session.id] = session;
    session.log('created')
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

  setInterval(function() {
    monitor.cleanup();
  }, (CLEANUP_FREQUENCY * 1000));
}

function LogMonitorSession() {
  this.id           = Date.now().toString() + '.' + parseInt(Math.random() * 1000000);
  this.buffer       = [];
  this.processes    = [];
  this.last_request = Date.now();

  this.monitor_file = function(process, filename) {
    var session = this;
    this.log('monitoring file: ' + filename);

    var child = process.createChildProcess('tail', ['-n', '100', '-f', filename]);
    child.addListener('output', function(data) {
      session.buffer.push(data);
    });

    session.processes.push(child);
  }

  this.touch = function() {
    this.last_request = Date.now();
  }

  this.log = function(message) {
    log.write('[session:' + this.id + '] ' + message);
  }

  this.close = function() {
    var session = this;
    this.log('reaping processes');
    this.processes.forEach(function(process) {
      try { process.kill(); } catch(ex) { session.log('dead child process') }      
    });
  }
}

exports.monitor = new LogMonitor();
