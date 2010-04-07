require.paths.unshift('lib')
require.paths.unshift('lib/express/lib')

var sys = require('sys');

require('express');

use(require('clio_session').ClioSession);
use(require('validation').Validation);

post('/sessions/static', function() {
  return(this.create_clio_session({ continuous: false }));
});

post('/sessions/continuous', function() {
  return(this.create_clio_session({ continuous: true }));
});

get('/sessions/:id', function(id) {
  var session = this.clio_session(id);

  if (session.continuous || session.exited) {
    this.respond_with_session(session);
  } else {
    var request = this;
    session.addListener('exit', function() {
      request.respond_with_session(session);
    });
  }
});

run(process.env["SERVER_PORT"] || 8000)
