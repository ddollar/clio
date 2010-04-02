var sys = require('sys');
var LogMonitor = require('./lib/log_monitor');
require.paths.unshift('lib/express/lib')
require('express');

var AUTH_KEY = 'owgnsfn83yh3pntb!lh93ydkgjbmsdf';
var LOG_ROOT = '/logs';

post('/sessions', function() {
  if (this.headers.authorization != AUTH_KEY) { this.halt(401); }

  var slug_id = this.body;
  var cloud   = this.headers.cloud;

  // basic protection for invalid parameters
  if (!slug_id.match(/^[0-9a-f_]+$/)) { this.error('Invalid Slug');  return; }
  if (!cloud.match(/^[a-z\.]+$/))       { this.error('Invalid Cloud'); return; }

  // create a session and start monitoring the slug's log file
  var session = LogMonitor.monitor.create_session();
  session.monitor_file(process, LOG_ROOT + '/' + cloud + '/' + slug_id + '.log');

  // return the url to look for sessions
  return('/sessions/' + session.id);
});

get('/sessions/:id', function(id) {
  var session = LogMonitor.monitor.sessions[id];

  if (!session) { this.halt(404); }

  // touch the session to keep it alive
  session.touch();

  // capture this session's data into a buffer
  var data = '';
  while (session.buffer.length > 0) { data += session.buffer.shift(); }

  // return a not-modified if there's no data
  if (data == '') { this.halt(304); }

  return(data);
});

run(process.env["SERVER_PORT"] || 8000)
