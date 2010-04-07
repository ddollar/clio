var Request = require('express/request').Request

exports.Validation = Plugin.extend({
  extend: {
    init: function() {
      Request.include({
        validate: function(value, matcher, error) {
          if (!value.match(matcher)) {
            this.error(error || 'Invalid Value');
          }
        }
      });
    }
  }
});
