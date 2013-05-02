var Orange = require('orangejs');
var MySQLAdapter = require('orangejs').MySQLAdapter;
var Deferred = require('node-promise').defer;

var Movie = MySQLAdapter.extend({

  getName: function() {
    return 'movies';
  },
  
  getTableName: function() {
    return 'movies';
  },
  
  getSchema: function() {
    return {
      id: { name: 'id', type: 'key' },
      name: { name: 'name' },
      year: { name: 'year' }
    };
  },
    
    searchMovies: function(keyword) {
        var deferred = new Deferred();
        var query = "SELECT * FROM " + this.getTableName() + " WHERE name LIKE %" + keyword + "%;";
        
        this.db.query(query, values, function(err, rows, fields) {
          if (rows instanceof Array && rows.length > 0) {
            deferred.resolve(that.getEntities(rows));
          } else if (rows instanceof Array) {
            deferred.resolve([]);
          } else {
            deferred.reject();
          }
        });
        
        return deferred;
        
    }

});

module.exports = Movie;