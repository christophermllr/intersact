var Orange = require('orangejs');
var API = require('orangejs').API;

var ActorAdapter = require('../access/actor');
var MovieAdapter = require('../access/movie');
var RoleAdapter = require('../access/role');

var IntersActAPI = API.extend({
  
  initialize: function(db) {
    this.Actor = new ActorAdapter(db);
    this.Movie = new MovieAdapter(db);
    this.Role = new RoleAdapter(db);
  },
  
  getPath: function() {
    return '';
  },
  
  getEndpoints: function() {
    return {
      'searchMovies': { validate: ['keyword'] },
      'computeIntersect': { validate: ['movie1', 'movie2'] }
    };
  },
  
  searchMovies: function(keyword) {
        
    return this.request(function() {
      return this.Movie.searchMovies(keyword);
    }, function(movies) {
      return movies;
    });
    
  },
    
  computeIntersect: function(movie1, movie2) {
    
    return this.request(function() {
      return this.Role.computeIntersect(movie1, movie2);
    }, function(actors) {
      return actors;
    }); 
      
  },
  
});

module.exports = IntersActAPI;