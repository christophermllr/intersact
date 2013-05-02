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
    
    computeIntersect: function (movie1, movie2) {
        var deferred = new Deferred();
        var that = this;
        var query = "SELECT * FROM actors WHERE id IN "
            + "(SELECT t1.actor_id "
            + " FROM roles t1"
            + " INNER JOIN roles t2"
            + " ON t1.actor_id = t2.actor_id"
            + " WHERE t1.movie_id = ?"
            + " AND t2.movie_id = ?)";

        var values = [movie1, movie2];

        this.db.query(query, values, function (err, rows, fields) {
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