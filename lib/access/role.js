var Orange = require('orangejs');
var MySQLAdapter = require('orangejs').MySQLAdapter;
var Deferred = require('node-promise').defer;

var Role = MySQLAdapter.extend({

  getName: function() {
    return 'roles';
  },
  
  getTableName: function() {
    return 'roles';
  },
  
  getSchema: function() {
    return {
      actor_id: { name: 'actor_id' },
      movie_id: { name: 'movie_id' },
      role: { name: 'role' }
    };
  },
    
    computeIntersect: function(movie1, movie2) {
        var deferred = new Deferred();
        var query = "SELECT * FROM " + this.getTableName() + " r INNER JOIN actors a ON r.actor_id = a.id WHERE name LIKE '%" + keyword + "%';";
        
        this.db.query(query, [], function(err, rows, fields) {
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

module.exports = Role;