var Orange = require('orangejs');
var MySQLAdapter = require('orangejs').MySQLAdapter;

var Actor = MySQLAdapter.extend({

  getName: function() {
    return 'actors';
  },
  
  getTableName: function() {
    return 'actors';
  },
  
  getSchema: function() {
    return {
      id: { name: 'id', type: 'key' },
      first_name: { name: 'first_name' },
      last_name: { name: 'last_name' }
    };
  }

});

module.exports = Actor;