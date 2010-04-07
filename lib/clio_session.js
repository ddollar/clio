var Request = require('express/request').Request
var Monitor = require('monitor').Monitor;

var AUTH_KEY = process.env['AUTH_KEY'];
var LOG_ROOT = '/logs';

exports.ClioSession = Plugin.extend({
  extend: {
    init: function() {
      Request.include({
        create_clio_session: function(options) {
          if (this.headers.authorization != AUTH_KEY) { this.halt(401); }

          var params = JSON.parse(this.body);
          var slug   = params.slug;
          var cloud  = params.cloud;

          this.validate(slug,  new RegExp(/^[0-9a-f_]+$/), 'Invalid Slug');
          this.validate(cloud, new RegExp(/^[a-z\.]+$/),   'Invalid Cloud');

          // create a session and start monitoring the slug's log file
          var session = Monitor.create_session({
            continuous: options.continuous || false,
            filename:   sprintf('%s/%s/%s.log', LOG_ROOT, cloud, slug)
          });

          // return the url to look for sessions
          return('/sessions/' + session.id);
        },

        clio_session: function(id) {
          var session = Monitor.session(id);
          if (!session) { this.halt(404); }
          return(session);
        },

        respond_with_session: function(session) {
          this.status(200);
          this.respond(session.drain_buffer());
        }
      });
    }
  }
});
