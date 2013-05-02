var Orange = require('orangejs');
var Server = require('orangejs').Server;
var mysql = require('mysql');

var IntersActAPI = require('./service/service');

var IntersActServer = Server.extend({
  
  initialize: function(port) {
  
    this._super(port);
    
    var db = mysql.createConnection({
      host     : 'localhost',
      user     : 'intersact',
      password : 'pancake'
    });
    
    db.connect();
    db.query('USE idunno', function(err) {
      if (err) {
        throw 'Unable to connect to database';
      }
    });
        
    this.IntersActAPI = new IntersActAPI(db);
    this.register(this.IntersActAPI);
    
  }
  
});

Orange.run(IntersActServer, 3003);